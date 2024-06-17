import { memoise } from "../util/memoise"

export class Point {
  constructor({ type = "Point", coordinates }) {
    this.type = type
    this.extent = [...coordinates, ...coordinates]
    this.coordinates = coordinates

    this.getProjected = memoise(this._getProjected).bind(this)
  }

  _getProjected(projection) {
    return {
      type: this.type,
      coordinates: projection(this.coordinates),
    }
  }
}
