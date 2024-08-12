import { Geometry } from "./Geometry"

export class Point extends Geometry {
  constructor({ type = "Point", extent, coordinates }) {
    super({ type, extent, coordinates })
  }

  _getProjected(projection) {
    return {
      type: this.type,
      coordinates: projection(this.coordinates),
    }
  }
}
