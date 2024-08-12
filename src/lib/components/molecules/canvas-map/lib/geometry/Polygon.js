import { Geometry } from "./Geometry"

export class Polygon extends Geometry {
  constructor({ type = "Polygon", extent, coordinates }) {
    super({ type, extent, coordinates })
  }

  _getProjected(projection) {
    const projected = []
    const rings = this.coordinates
    for (const ring of rings) {
      const projectedRing = []
      for (const point of ring) {
        const projectedPoint = projection(point)
        if (projectedPoint) {
          projectedRing.push(projectedPoint)
        } else {
          break
        }
      }
      if (projectedRing.length > 0) {
        projected.push(projectedRing)
      }
    }

    return {
      type: this.type,
      coordinates: projected,
    }
  }

  getOuterRing() {
    return this.coordinates[0]
  }

  setOuterRing(coordinates) {
    this.coordinates[0] = coordinates
  }

  setCoordinates(coordinates) {
    this.coordinates = coordinates
  }

  clone() {
    return new Polygon({
      extent: this.extent,
      coordinates: JSON.parse(JSON.stringify(this.coordinates)),
    })
  }
}

// FIXME: implement simplification?

// const { flatCoordinates, stride, ends } = this._flattenCoordinates(coordinates)
// this.flatCoordinates = flatCoordinates
// this.stride = stride
// this.ends = ends

// _flattenCoordinates() {
//   let flatCoordinates = []
//    const ends = deflateCoordinatesArray(
//     flatCoordinates,
//     0,
//     coordinates,
//     this.stride,
//     this.ends_,
//   );
//   this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
// }
