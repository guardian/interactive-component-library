import { sizeMinusPadding, scaleSize, scalePadding } from "./util/size"
import { bboxFeature } from "./util/bboxFeature"
import { ZoomTransform } from "d3-zoom"

export class View {
  constructor({ projection, extent, minZoom, maxZoom, padding }) {
    projection.revision = 0
    this.projection = projection
    // extent in projection coordinates
    this.extent = extent
    this.minZoom = minZoom
    this.maxZoom = maxZoom
    this._padding = padding
    this._viewPortSize = [0, 0]
    this.pixelRatio = window.devicePixelRatio
  }

  set viewPortSize(size) {
    const previousSize = this._viewPortSize
    this._viewPortSize = size

    if (previousSize !== size) {
      this.fitObject(bboxFeature(this.extent))
    }
  }

  get viewPortSize() {
    return this._viewPortSize
  }

  set transform(transform) {
    this._transform = transform
  }

  get transform() {
    return new ZoomTransform(this._transform.k, this._transform.x * this.pixelRatio, this._transform.y * this.pixelRatio)
  }

  // map size in pixels (i.e. scaled by device pixel ratio)
  get mapSize() {
    return sizeMinusPadding(scaleSize(this.viewPortSize, this.pixelRatio), this.scaledPadding)
  }

  // padding in pixels (i.e. scaled by device pixel ratio)
  get padding() {
    return this._padding
  }

  get scaledPadding() {
    const scaledPadding = { ...this._padding }
    return scalePadding(scaledPadding, this.pixelRatio)
  }

  // defines the upper and lower limits for zoom behaviour
  get scaleExtent() {
    return [this.minZoom, this.maxZoom]
  }

  setProjection(projection) {
    this.projection = projection
    this.fitObject(bboxFeature(this.extent))
  }

  // only set the raw projection when it has already been configured with projection.fitExtent()
  setRawProjection(projection) {
    this.projection = projection
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

  // get extent for drawn map
  getMapExtent() {
    const [width, height] = this.mapSize
    const { left, top } = this.scaledPadding
    return [
      [left, top],
      [width, height],
    ]
  }

  // visible extent in map coordinates
  getVisibleExtent(transform, projection) {
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
      sizeInPixels: scaleSize(this.viewPortSize, this.pixelRatio),
      visibleExtent: this.getVisibleExtent(transform, projection),
    }
  }
}
