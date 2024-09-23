import { Extent } from "../util"
import { Geometry } from "./Geometry"

/**
 * Note that GeoJSON does not support circles out the box, so we define a circle as any `Point` type
 * geometry with a `radius` property.
 */
export class Circle extends Geometry {
  constructor({ type = "Circle", coordinates, radius }) {
    super({ type, extent: null, coordinates })

    this.radius = radius

    this.extent = new Extent(
      coordinates[0] - radius,
      coordinates[1] - radius,
      coordinates[0] + radius,
      coordinates[1] + radius,
    )
  }

  getRadius() {
    return this.radius
  }

  _getProjected(projection) {
    return {
      type: this.type,
      coordinates: projection(this.coordinates),
    }
  }
}
