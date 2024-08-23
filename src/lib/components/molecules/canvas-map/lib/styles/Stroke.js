import { memoise } from "../util/memoise"
import { toRgba } from "../util/toRgba"

/**
 * @enum {string}
 * @memberof Stroke
 * @property {string} CENTER - Center the stroke
 * @property {string} INSIDE - Stroke is rendered inside the shape
 * @property {string} OUTSIDE - Stroke is rendered outside the shape
 * @readonly
 * @static
 * @default "center"
 */
export const StrokePosition = {
  CENTER: "center",
  INSIDE: "inside",
  OUTSIDE: "outside",
}

/**
 * @class Stroke
 * @property {string} [color="#121212"] - The stroke color
 * @property {number} [width=0.5] - The stroke width
 * @property {number} [opacity=1] - The stroke opacity
 * @property {StrokePosition} [position="center"] - Where the shape's stroke is rendered (ignored if geometry is not a Polygon)
 */
export class Stroke {
  constructor(options) {
    this.color = options?.color || "#121212"
    this.width = options?.width || 0.5
    this.opacity = options?.opacity || 1
    this.position = options?.position || StrokePosition.CENTER

    this._getRgba = memoise(toRgba)
  }

  getRgba() {
    return this._getRgba(this.color, this.opacity)
  }
}
