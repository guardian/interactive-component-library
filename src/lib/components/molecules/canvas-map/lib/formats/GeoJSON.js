import { Feature } from "../Feature"
import { Polygon, LineString, Point } from "../geometry"
import { extentForCoordinates } from "../util/extent"

/**
 * @typedef {Object} GeoJSONFeature
 * @property {string} type
 * @property {Object} geometry
 * @property {Record<string, any>} properties
 */

/**
 * @typedef {Object} GeoJSONFeatureCollection
 * @property {string} type
 * @property {GeoJSONFeature[]} features
 */

/**
 * @typedef GeoJSONParseOptions
 * @property {boolean} [isProjected=false] - Tells the parser whether the geometry is already projected or not
 */

export class GeoJSON {
  /**
   * @constructor
   * @param {GeoJSONParseOptions} [parseOptions]
   */
  constructor(parseOptions = {}) {
    this.isProjected = parseOptions?.isProjected
  }

  /**
   * Convert GeoJSON object(s) to array of {@link Feature} objects.
   *
   * @function
   * @param {GeoJSONFeature | GeoJSONFeatureCollection | GeoJSONFeature[]} object GeoJSON object
   * @returns {Feature[]}
   */
  readFeaturesFromObject(object) {
    const geoJSONObject = object
    let features = null
    if (geoJSONObject["type"] === "FeatureCollection") {
      const geoJSONFeatureCollection = object
      features = []
      const geoJSONFeatures = geoJSONFeatureCollection["features"]
      for (let i = 0, ii = geoJSONFeatures.length; i < ii; ++i) {
        const featureObject = this.readFeatureFromObject(geoJSONFeatures[i])
        if (!featureObject) {
          continue
        }
        features.push(featureObject)
      }
    } else if (geoJSONObject["type"] === "Feature") {
      features = [
        this.readFeatureFromObject(
          /** @type {GeoJSONFeature} */ (geoJSONObject),
        ),
      ]
    } else if (Array.isArray(geoJSONObject)) {
      features = []
      for (let i = 0, ii = geoJSONObject.length; i < ii; ++i) {
        const featureObject = this.readFeatureFromObject(geoJSONObject[i])
        if (!featureObject) {
          continue
        }
        features.push(featureObject)
      }
    } else {
      try {
        const geometries = this.readGeometriesFromObject(geoJSONObject)
        const feature = new Feature({ geometries })
        features = [feature]
      } catch {
        console.warn("Unable to interpret GeoJSON:", geoJSONObject)
        return
      }
    }

    return features.flat()
  }

  /**
   * Convert single GeoJSON feature to {@link Feature} object.
   *
   * @function
   * @param {GeoJSONFeature} geoJSONObject GeoJSON object
   * @returns {Feature | null}
   */
  readFeatureFromObject(geoJSONObject) {
    const geometries = this.readGeometriesFromObject(geoJSONObject["geometry"])
    if (geometries.length > 0) {
      return new Feature({
        id: geoJSONObject["id"],
        geometries,
        properties: geoJSONObject["properties"],
      })
    }

    return null
  }

  readGeometriesFromObject(geometry) {
    const geometries = []
    if (geometry.type === "Polygon") {
      const polygon = this.readPolygonForCoordinates(geometry.coordinates)
      geometries.push(polygon)
    } else if (geometry.type === "MultiPolygon") {
      for (const polygonCoordinates of geometry.coordinates) {
        const polygon = this.readPolygonForCoordinates(polygonCoordinates)
        geometries.push(polygon)
      }
    } else if (geometry.type === "LineString") {
      const lineString = this.readLineStringForCoordinates(geometry.coordinates)
      geometries.push(lineString)
    } else if (geometry.type === "MultiLineString") {
      for (const lineStringCoordinates of geometry.coordinates) {
        const lineString = this.readLineStringForCoordinates(
          lineStringCoordinates,
        )
        geometries.push(lineString)
      }
    } else if (geometry.type === "Point") {
      const point = this.readPointForCoordinates(geometry.coordinates)
      geometries.push(point)
    }

    return geometries
  }

  readPolygonForCoordinates(coordinates) {
    // the first ring of a Polygon is always the outer ring
    const outerRing = coordinates[0]
    const extent = extentForCoordinates(outerRing)
    return new Polygon({ extent, coordinates })
  }

  readLineStringForCoordinates(coordinates) {
    const extent = extentForCoordinates(coordinates)
    return new LineString({ extent, coordinates })
  }

  readPointForCoordinates(coordinates) {
    return new Point({ coordinates })
  }
}
