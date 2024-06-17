import { memoise } from "../util/memoise"

export class LineString {
  constructor({ type = "LineString", extent, coordinates }) {
    this.type = type
    this.extent = extent
    this.coordinates = coordinates

    this.getProjected = memoise(this._getProjected).bind(this)
  }

  _getProjected(projection) {
    const projected = []
    for (const point of this.coordinates) {
      projected.push(projection(point))
    }

    return {
      type: this.type,
      coordinates: projected,
    }
  }
}
