import { Extent } from "../util"
import { Geometry } from "./Geometry"

export class Point extends Geometry {
  constructor({ type = "Point", coordinates }) {
    super({ type, extent: null, coordinates })
    this.extent = new Extent(
      coordinates[0],
      coordinates[1],
      coordinates[0],
      coordinates[1],
    )
  }

  _getProjected(projection) {
    return {
      type: this.type,
      coordinates: projection(this.coordinates),
    }
  }
}
