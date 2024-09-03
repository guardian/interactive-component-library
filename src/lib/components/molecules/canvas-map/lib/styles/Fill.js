import { memoise } from "../util/memoise"
import { toRgba } from "../util/toRgba"

/**
 * @class Fill
 * @description Represents a fill style for a feature
 * @property {string} color - The color of the fill
 * @property {number} opacity - The opacity of the fill
 * @property {HashPattern} pattern - The pattern of the fill
 */
export class Fill {
  /**
   * @constructor
   * @description Creates a new instance of the Fill class
   * @param {Object} [options] - The options for the fill
   * @param {string} [options.color="#CCC"] - The color of the fill
   * @param {number} [options.opacity=1] - The opacity of the fill
   * @param {Object} [options.pattern=null] - The pattern of the fill
   */
  constructor(options) {
    this.color = options?.color || "#CCC"
    this.opacity = options?.opacity || 1
    this.pattern = options?.pattern || null

    this._getRgba = memoise(toRgba)
  }

  /**
   * @function getRgba
   * @description Returns the fill color as an RGBA string
   * @returns {string} The fill color with opacity applied
   */
  getRgba() {
    return this._getRgba(this.color, this.opacity)
  }

  drawInContext(context, scale) {
    if (this.pattern) {
      context.fillStyle = this.pattern.createPatternInContext(context, scale)
    } else {
      context.fillStyle = this.getRgba()
    }

    context.fill()
  }
}
