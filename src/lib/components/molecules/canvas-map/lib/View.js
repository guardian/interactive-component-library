import { sizeMinusPadding, scaleSize, scalePadding } from "./util/size"
import { bboxFeature } from "./util/bboxFeature"
import { ZoomTransform, zoomIdentity } from "d3-zoom"
import { zoomLevelToZoomScale, zoomLevelForResolution } from "./util/zoomLevel"
import { resolutionForExtent } from "./util/resolution"
import { Projection } from "./projection"
import { generateDebugUrl } from "./util/debug"

/**
 * Represents how the map is viewed.
 * @constructor
 * @param {Object} options - The options for the view.
 * @param {Projection} options.projection - The projection to use for the view.
 * @param {Array} options.extent - The extent of the view in projection coordinates.
 * @param {number} options.minZoom - The minimum zoom level for the view.
 * @param {number} options.maxZoom - The maximum zoom level for the view.
 * @param {Object} options.padding - The padding for the view in pixels.
 * @param {boolean} debug - Whether to enable debug mode or not.
 */
export class View {
  constructor(
    {
      projection = Projection.geoIdentity,
      extent,
      minZoom = 1,
      maxZoom = 10,
      padding = { top: 0, right: 0, bottom: 0, left: 0 },
    },
    debug = false,
  ) {
    this.debug = debug
    projection.revision = 0
    this.projection = projection
    // extent in projection coordinates
    this.extent = extent
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this._transform = zoomIdentity
    this._padding = padding
    this._viewPortSize = [0, 0]
    this.pixelRatio = window.devicePixelRatio
  }

  set viewPortSize(size) {
    const previousSize = this._viewPortSize
    this._viewPortSize = size

    if (previousSize !== size) {
      if (this.extent) {
        // fit projection to extent
        this.fitExtent(this.extent)
      }
    }
  }

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
    const baseExtent = this.getVisibleExtent(zoomIdentity, this.projection)
    const baseResolution = resolutionForExtent(baseExtent, this.viewPortSize)
    return baseResolution
  }

  // calculates the upper and lower zoom scales
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

  fitExtent(extent) {
    const extentFeature = bboxFeature(extent)
    this.fitObject(extentFeature)

    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log("Fit extent", generateDebugUrl(extentFeature))
    }
  }

  fitObject(geoJSON) {
    this.projection.fitExtent(this.getMapExtent(), geoJSON)

    ++this.projection.revision
  }

  // returns bounds relative to the viewport
  boundsForExtent(extent) {
    const SW = this.projection([extent[0], extent[1]])
    const NE = this.projection([extent[2], extent[3]])
    const minX = SW[0] / this.pixelRatio
    const minY = NE[1] / this.pixelRatio
    const maxX = NE[0] / this.pixelRatio
    const maxY = SW[1] / this.pixelRatio
    const width = maxX - minX
    const height = maxY - minY
    return [
      [minX, minY],
      [width, height],
    ]
  }

  invert(point) {
    const { projection, pixelRatio, transform } = this.getState()

    // scale for device pixel ratio
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
    return resolutionForExtent(
      this.getVisibleExtent(this.transform, this.projection),
      this.viewPortSize,
    )
  }

  // map zoom level (0 = the entire world)
  getZoomLevel() {
    return zoomLevelForResolution(this.getResolution())
  }

  // get extent for drawn map
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

  // visible extent in map coordinates
  getVisibleExtent(transform, projection) {
    if (this.projection === Projection.geoIdentity) {
      const [width, height] = this.mapSize
      return [0, 0, width, height]
    }

    const [width, height] = this.mapSize
    const southWest = projection.invert(transform.invert([0, height]))
    const northEast = projection.invert(transform.invert([width, 0]))
    return [southWest[0], southWest[1], northEast[0], northEast[1]]
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
      visibleExtent: this.getVisibleExtent(transform, projection),
    }
  }
}
