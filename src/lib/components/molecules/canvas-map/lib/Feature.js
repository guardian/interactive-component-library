import { createUid } from "./util/uid"
import { combineExtents, containsCoordinate } from "./util/extent"
import { geoContains } from "d3-geo"

export class Feature {
  constructor({ id, geometries, properties, style }) {
    this.id = id
    this.geometries = geometries
    this.properties = properties
    this.style = style

    // create a unique ID for this feature
    this.uid = createUid()
  }

  getExtent() {
    if (this._extent) return this._extent

    const extent = this.geometries.reduce((combinedExtent, geometry) => {
      if (!combinedExtent) return geometry.extent
      return combineExtents(geometry.extent, combinedExtent)
    }, null)
    this._extent = extent
    return extent
  }

  setGeometries(geometries) {
    this.geometries = geometries
    this._extent = undefined
  }

  getProjectedGeometries(projection) {
    return this.geometries.map((d) => d.getProjected(projection, projection.revision))
  }

  getStyleFunction() {
    const style = this.style
    if (!style) return null
    if (typeof style === "function") return style
    return () => {
      return style
    }
  }

  containsCoordinate(coordinate) {
    if (!containsCoordinate(this.getExtent(), coordinate)) {
      return false
    }

    for (const geometry of this.geometries) {
      if (geoContains(geometry.getGeoJSON(), coordinate)) {
        return true
      }
    }

    return false
  }

  clone() {
    return new Feature({
      id: this.id,
      geometries: this.geometries.map((d) => d.clone()),
      properties: this.properties,
      style: this.style,
    })
  }
}
