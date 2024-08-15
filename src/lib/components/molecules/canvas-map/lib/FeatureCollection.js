import { GeoJSON } from "./formats/GeoJSON"

/**
 * Class representing a collection of map features.
 * @class
 * @property {import("./Feature").Feature[]} features - The features in the feature collection
 */
export class FeatureCollection {
  /**
   * Create a feature collection from GeoJSON features.
   * @param {Object[]} geoJSON - The GeoJSON object
   * @param {import("./formats/GeoJSON").GeoJSONParseOptions} [parseOptions] - Options for parsing the GeoJSON object
   * @returns {FeatureCollection} The feature collection
   */
  static fromGeoJSON(geoJSON, parseOptions) {
    const features = new GeoJSON(parseOptions).readFeaturesFromObject(geoJSON)
    return new FeatureCollection(features)
  }

  /**
   * Create a feature collection.
   * @constructor
   * @param {import("./Feature").Feature[]} features - The features to put in the collection
   */
  constructor(features) {
    this.features = features
  }
}
