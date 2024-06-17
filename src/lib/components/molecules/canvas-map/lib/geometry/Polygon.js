import { memoise } from "../util/memoise"

export class Polygon {
  constructor({ type = "Polygon", extent, coordinates }) {
    this.type = type
    this.extent = extent
    this.coordinates = coordinates

    this.getProjected = memoise(this._getProjected).bind(this)
  }

  // eslint-disable-next-line no-unused-vars
  _getProjected(projection, _revision) {
    const projected = []
    const rings = this.coordinates
    for (const ring of rings) {
      const projectedRing = []
      for (const point of ring) {
        projectedRing.push(projection(point))
      }
      projected.push(projectedRing)
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

  getGeoJSON() {
    return {
      type: this.type,
      coordinates: this.coordinates,
    }
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
