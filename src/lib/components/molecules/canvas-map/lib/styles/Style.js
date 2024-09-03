/**
 * A function that takes a {@link import("../Feature").Feature} and returns a {@link Style}
 *
 * @typedef {function(import("../Feature").Feature):(Style)} StyleFunction
 */

/**
 * Class representing a style.
 * @class
 * @property {Object} properties - The properties of the style
 * @property {Object} properties.stroke - The stroke color of the style
 * @property {Fill} properties.fill - The fill color of the style
 * @property {Object} properties.text - The text color of the style
 */
export class Style {
  constructor(properties) {
    this.stroke = properties?.stroke
    this.fill = properties?.fill
    this.text = properties?.text
  }

  clone() {
    return new Style({
      stroke: this.stroke,
      fill: this.fill,
      text: this.text,
    })
  }
}
