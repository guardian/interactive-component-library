import { createUid } from "./util/uid"
import { combineExtents, containsCoordinate } from "./util/extent"
import { polygonContains } from "d3-polygon"
import { memoise } from "./util/memoise"

/**
 * Class representing a map Feature.
 * @class
 * @property {string} id - The unique identifier of the feature
 * @property {Array} geometries - The geometries of the feature
 * @property {Object} properties - The properties of the feature
 * @property {Style} style - The style of the feature
 */
export class Feature {
  /**
   * Represents a feature on the map
   * @constructor
   * @param {Object} props - The properties for the feature.
   * @property {string} id - The unique identifier of the feature
   * @property {Array} geometries - The geometries of the feature
   * @property {Object} properties - The properties of the feature
   * @property {import("./styles").Style | import("./styles").StyleFunction} style - The style of the feature
   */
  constructor({ id, geometries, properties, style }) {
    this.id = id
    this.geometries = geometries
    this.properties = properties
    this.style = style

    // create a unique ID for this feature
    this.uid = createUid()

    this._getProjectedGeometries = memoise((projection) => {
      return this.geometries.map((d) =>
        d.getProjected(projection, projection.revision),
      )
    }).bind(this)
  }

  setGeometries(geometries) {
    this.geometries = geometries
    this._extent = undefined
  }

  /**
   * Get the extent of the geometries in the feature.

   * @returns {import("./util").Extent}
   */
  getExtent() {
    if (this._extent) return this._extent

    const extent = this.geometries.reduce((combinedExtent, geometry) => {
      if (!combinedExtent) return geometry.extent
      return combineExtents(geometry.extent, combinedExtent)
    }, null)
    this._extent = extent
    return extent
  }

  getProjectedGeometries(projection) {
    return this._getProjectedGeometries(projection, projection.revision)
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
      // Only the outer ring of the geometry is considered, because we don't care about holes in the shape
      if (polygonContains(geometry.getOuterRing(), coordinate)) {
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

  /**
   * Returns the geometries as a GeoJSON object
   * @returns {Object} The GeoJSON representation of the geometries
   */
  getGeoJSON() {
    const geometries = this.geometries.map((d) => d.getGeoJSON())
    if (geometries.length === 1) return geometries[0]

    return {
      type: "Feature",
      geometry: this._getGeometryGeoJSON(),
      properties: this.properties,
    }
  }

  _getGeometryGeoJSON() {
    const geometries = this.geometries.map((d) => d.getGeoJSON())
    if (geometries.length === 0) throw new Error("Feature has no geometries")
    if (geometries.length === 1) return geometries[0]

    if (geometries[0].type === "Polygon") {
      return {
        type: "MultiPolygon",
        coordinates: geometries.map((d) => d.coordinates),
      }
    } else if (geometries[0].type === "LineString") {
      return {
        type: "MultiLineString",
        coordinates: geometries.map((d) => d.coordinates),
      }
    } else if (geometries[0].type === "Point") {
      return {
        type: "MultiPoint",
        coordinates: geometries.map((d) => d.coordinates),
      }
    }

    throw new Error("Could not determine geometry type")
  }
}
