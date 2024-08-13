import { Geometry } from "./Geometry"

export class Point extends Geometry {
  constructor({ type = "Point", coordinates }) {
    super({ type, extent: null, coordinates })
    this.extent = [...coordinates, ...coordinates]
  }

  _getProjected(projection) {
    return {
      type: this.type,
      coordinates: projection(this.coordinates),
    }
  }
}
