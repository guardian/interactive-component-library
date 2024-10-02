/**
 * @import { Text } from "./Text";
 * @import { Stroke } from "./Stroke"
 * @import { Fill } from "./Fill"
 *
 * @callback StyleFunction
 * @param {import("../Feature").Feature} feature The feature to style.
 * @param {number} zoom The current map zoom level
 * @returns {Style}
 */

/**
 * Class representing a style.
 * @class
 * @property {Object} properties - The properties of the style
 * @property {Object} properties.stroke - The stroke color of the style
 * @property {Fill} properties.fill - The fill color of the style
 * @property {Object} properties.text - The text color of the style
 * @property {number} properties.pointRadius - Radius of drawn "Point"-type geometries, if present
 */
export class Style {
  /**
   * @param {Object} [properties]
   * @param {Stroke} [properties.stroke]
   * @param {Fill} [properties.fill]
   * @param {Text} [properties.text]
   * @param {number} [properties.pointRadius]
   */
  constructor(properties) {
    /**
     * @type {Stroke}
     * @public
     */
    this.stroke = properties?.stroke
    /**
     * @type {Fill}
     * @public
     */
    this.fill = properties?.fill
    /**
     * @type {Text}
     * @public
     */
    this.text = properties?.text
    this.pointRadius = properties?.pointRadius
  }

  clone() {
    return new Style({
      stroke: this.stroke,
      fill: this.fill,
      text: this.text,
      pointRadius: this.pointRadius,
    })
  }
}
