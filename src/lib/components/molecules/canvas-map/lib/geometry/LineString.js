import { Geometry } from "./Geometry"

export class LineString extends Geometry {
  constructor({ type = "LineString", extent, coordinates }) {
    super({ type, extent, coordinates })
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
