import { sizeMinusPadding, scaleSize, scalePadding } from "./util/size"
import { ZoomTransform, zoomIdentity } from "d3-zoom"
import { zoomLevelToZoomScale, zoomLevelForResolution } from "./util/zoomLevel"
import { Extent, GeoBounds, resolutionForBounds, bboxFeature } from "./util"
import { Projection } from "./projection"
import { generateDebugUrl } from "./util/debug"

/**
 * @typedef ViewConfig
 * @property {import("./projection").ProjectionFunction} projection - The projection to use for the view.
 * @property {import("./util/bounds").GeoBounds} [bounds] - The bounds of the map view in projection coordinates.
 * @property {import("./util/extent").ExtentLike} [extent] - The extent of the map view in screen coordinates (for preprojected geometry).
 * @property {number} minZoom - The minimum zoom level for the view.
 * @property {number} maxZoom - The maximum zoom level for the view.
 * @property {Object} padding - The padding for the view in pixels.
 * @property {boolean} [debug="false"] - Enable/disable debug mode.
 */

/**
 * Represents how the map is viewed.
 * @class
 */
export class View {
  /**
   * @constructor
   * @property {ViewConfig} config - A view configuration object
   */
  constructor(
    {
      projection = Projection.geoIdentity,
      bounds,
      extent,
      minZoom = 1,
      maxZoom = 10,
      padding = { top: 0, right: 0, bottom: 0, left: 0 },
    },
    debug = false,
  ) {
    this.debug = debug
    // @ts-ignore
    projection.revision = 0
    this.projection = projection
    this.bounds = bounds && GeoBounds.convert(bounds)
    // extent in projection coordinates
    this.extent = Extent.convert(extent) || GeoBounds.convert(bounds).toExtent()
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this._transform = zoomIdentity
    this._padding = padding

    /** @type { [number, number] } */
    this._viewPortSize = [0, 0]
    this.pixelRatio =
      typeof window !== "undefined" ? window.devicePixelRatio : 1
  }

  set viewPortSize(size) {
    const previousSize = this._viewPortSize
    this._viewPortSize = size

    if (previousSize !== size) {
      if (this.extent) {
        // fit projection to extent
        this.fitBounds(this.extent)
      }
    }
  }

  /**
   * @returns {[number, number]} - The size of the viewport in pixels
   * @readonly
   */
  get viewPortSize() {
    return this._viewPortSize
  }

  set transform(transform) {
    this._transform = transform
  }

  get transform() {
    return new ZoomTransform(
      this._transform.k,
      this._transform.x * this.pixelRatio,
      this._transform.y * this.pixelRatio,
    )
  }

  // map size in pixels (i.e. scaled by device pixel ratio)
  get mapSize() {
    return scaleSize(this.viewPortSize, this.pixelRatio)
  }

  get padding() {
    return this._padding
  }

  // padding in pixels (i.e. scaled by device pixel ratio)
  get scaledPadding() {
    const scaledPadding = { ...this._padding }
    return scalePadding(scaledPadding, this.pixelRatio)
  }

  get baseResolution() {
    const bounds =
      this.bounds ?? this.getVisibleBounds(zoomIdentity, this.projection)
    const baseResolution = resolutionForBounds(bounds, this.viewPortSize)
    return baseResolution
  }

  /**
   * Get the lower and upper zoom scales
   * @returns {[number, number]} - The lower and upper zoom scales
   */
  get scaleExtent() {
    const maxScale = zoomLevelToZoomScale(this.maxZoom, this.baseResolution)
    return [1, maxScale]
  }

  setProjection(projection) {
    this.projection = projection
    this.fitObject(bboxFeature(this.extent))
  }

  // only set the raw projection when it has already been configured with projection.fitExtent()
  setRawProjection(projection) {
    this.projection = projection
  }

  /**
   * @param {import("./util").Extent} extent
   */
  fitExtent(extent) {
    const boundsFeature = bboxFeature(extent)
    this.fitObject(boundsFeature)

    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log("Fit extent", extent, generateDebugUrl(boundsFeature, false))
    }
  }

  fitBounds(bounds) {
    const boundsFeature = bboxFeature(bounds)
    this.fitObject(boundsFeature)

    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log("Fit extent", bounds, generateDebugUrl(boundsFeature, false))
    }
  }

  /**
   * @param {import("./formats/GeoJSON").GeoJSONFeature} geoJSON
   */
  fitObject(geoJSON) {
    // @ts-ignore
    this.projection.fitExtent(this.getMapExtent(), geoJSON)

    // @ts-ignore
    ++this.projection.revision
  }

  /**
   * Returns extent in projection coordinates
   *
   * @param {Extent} extent
   * @returns {Extent} - The extent relative to the current viewport
   */

  projectExtent(extent) {
    const [minX, minY] = this.projection([extent.minX, extent.minY])
    const [maxX, maxY] = this.projection([extent.maxX, extent.maxY])
    return new Extent(minX, minY, maxX, maxY).scale(1 / this.pixelRatio)
  }

  invert(point) {
    const { projection, pixelRatio, transform } = this.getState()

    // scale for device pixel ratio
    /** @type {[number, number]} */
    const scaledPoint = [point[0] * pixelRatio, point[1] * pixelRatio]

    // invert zoom transformation
    const untransformedPoint = transform.invert(scaledPoint)

    // find map coordinate based on projection
    const mapCoordinate = projection.invert(untransformedPoint)

    return mapCoordinate
  }

  // bounds is defined as [[minX, minY], [maxX, maxY]]
  invertBounds(bounds) {
    const topLeft = bounds[0]
    const topRight = [bounds[1][0], bounds[0][1]]
    const bottomRight = [bounds[1][0], bounds[1][1]]
    const bottomLeft = [bounds[0][0], bounds[1][1]]
    const points = [topLeft, topRight, bottomRight, bottomLeft, topLeft]
    return points.map((d) => this.invert(d))
  }

  // map resolution (meters per pixel)
  getResolution() {
    return resolutionForBounds(
      this.getVisibleBounds(this.transform, this.projection),
      this.viewPortSize,
    )
  }

  // map zoom level (0 = the entire world)
  getZoomLevel() {
    return zoomLevelForResolution(this.getResolution())
  }

  //
  /**
   * Function that returns the extent of the view in screen coordinates
   * The extent is defined as [[minX, minY], [maxX, maxY]]
   * @function getMapExtent
   * @returns {[[number, number], [number, number]]}
   */
  getMapExtent() {
    const mapSizeInPixels = this.mapSize
    const paddingInPixels = this.scaledPadding
    return [
      [paddingInPixels.left, paddingInPixels.top],
      sizeMinusPadding(mapSizeInPixels, {
        ...paddingInPixels,
        left: 0,
        top: 0,
      }),
    ]
  }

  /**
   * Get map bounds for current view
   *
   * @function getBounds
   * @param {ZoomTransform} transform
   * @param {*} projection
   * @returns {import("./util").GeoBounds}
   */
  getVisibleBounds(transform, projection) {
    const [width, height] = this.mapSize
    const southWest = projection.invert(transform.invert([0, height]))
    const northEast = projection.invert(transform.invert([width, 0]))
    return GeoBounds.convert({ sw: southWest, ne: northEast })
  }

  getState() {
    const transform = this.transform
    const projection = this.projection

    return {
      transform,
      projection,
      zoomLevel: transform.k,
      pixelRatio: this.pixelRatio,
      padding: this.padding,
      viewPortSize: this.viewPortSize,
      sizeInPixels: scaleSize(this.viewPortSize, this.pixelRatio),
      visibleExtent: this.getVisibleBounds(transform, projection).toExtent(),
    }
  }
}
