import { memoise } from "../util/memoise"

export class Geometry {
  /**
   * Represents vector geometry
   * @constructor
   * @param {Object} options
   * @param {string} options.type - The type of geometry (e.g., 'Point', 'LineString', 'Polygon')
   * @param {import("../util").Extent} options.extent - The extent of the geometry (e.g., [xmin, ymin, xmax, ymax])
   * @param {Array} options.coordinates - The coordinates of the geometry (e.g., [[x1, y1], [x2, y2], ...])
   */
  constructor({ type, extent, coordinates }) {
    this.type = type
    this.extent = extent
    this.coordinates = coordinates

    this.getProjected = memoise(this._getProjected).bind(this)
  }

  /**
   * Returns the geometry as a GeoJSON object
   * @function
   * @param {import("../projection").Projection} projection - The projection to use for the geometry
   * @returns {Object} A GeoJSON representation of the projected geometry
   * @private
   */
  // eslint-disable-next-line no-unused-vars
  _getProjected(projection) {
    // Should be implemented by subclasses. This is just a placeholder.
    throw new Error("Not implemented")
  }

  /**
   * Returns the geometry as a GeoJSON object
   * @returns {Object} The GeoJSON representation of the geometry
   */
  getGeoJSON() {
    return {
      type: this.type,
      coordinates: this.coordinates,
    }
  }
}
