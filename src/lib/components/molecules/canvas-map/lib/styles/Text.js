/**
 * The placement of the text relative to its position on the map
 * @readonly
 * @enum {string}
 * @property {string} TOP - The top of the text is placed closest to the anchor.
 * @property {string} BOTTOM - The bottom of the text is placed closest to the anchor.
 * @property {string} LEFT - The left side of the text is placed closest to the anchor.
 * @property {string} RIGHT - The right side of the text is placed closest to the anchor.
 * @property {string} CENTER - The center of the text is placed closest to the anchor.
 * @property {string} TOP_LEFT - The top left corner of the text is placed closest to the anchor.
 * @property {string} TOP_RIGHT - The top right corner of the text is placed closest to the anchor.
 * @property {string} BOTTOM_LEFT - The bottom left corner of the text is placed closest to the anchor.
 * @property {string} BOTTOM_RIGHT - The bottom right corner of the text is placed closest to the anchor.
 *
 * @example
 * const textAnchor = TextAnchor.CENTER;
 */
const TextAnchor = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
  TOP_LEFT: "top-left",
  TOP_RIGHT: "top-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_RIGHT: "bottom-right",
}

/**
 * @typedef TextStyle
 * @property {string} content - The text to render
 * @property {string} [id] - The id of the text element
 * @property {TextAnchor} [anchor="center"] - The anchor point of the text}
 * @property {number} [lineHeight=1.3] - The line height of the text
 * @property {string} [color="#121212"] - The color of the text
 * @property {string} [textShadow="1px 1px 0px #f6f6f6, -1px -1px 0px #f6f6f6, -1px 1px 0px #f6f6f6, 1px -1px #f6f6f6"] - The text shadow of the text
 * @property {string} [fontFamily="var(--text-sans)"] - The font family of the text
 * @property {string} [fontSize="17px"] - The font size of the text
 * @property {string} [fontWeight="400"] - The font weight of the text
 * @property {number} [radialOffset=0] - The radial offset of the text in ems
 */

/**
 * Class that represents a text style
 * @type Text
 * @implements {TextStyle}
 */
export class Text {
  /**
   * Create a text element style
   * @constructor
   * @param {TextStyle} options - Style options
   */
  constructor(options) {
    this.content = options?.content
    this.anchor = options?.anchor || TextAnchor.CENTER
    this.fontFamily = options?.fontFamily || "var(--text-sans)"
    this.fontSize = options?.fontSize || "17px"
    this.fontWeight = options?.fontWeight || "400"
    this.lineHeight = options?.lineHeight || 1.3
    this.color = options?.color || "#121212"
    this.textShadow =
      options?.textShadow ||
      "1px 1px 0px #f6f6f6, -1px -1px 0px #f6f6f6, -1px 1px 0px #f6f6f6, 1px -1px #f6f6f6"
    this.radialOffset = options?.radialOffset || 0
  }

  /**
   * Get the relative translation for the text element based on its anchor. The translation does not take `radialOffset` into account
   * @private
   * @return {{x: number, y: number}} - The x and y translation in percentage points
   */
  _getRelativeTranslation() {
    switch (this.anchor) {
      case TextAnchor.TOP:
        return { x: -50, y: 0 }
      case TextAnchor.BOTTOM:
        return { x: -50, y: -100 }
      case TextAnchor.LEFT:
        return { x: 0, y: -50 }
      case TextAnchor.RIGHT:
        return { x: -100, y: -50 }
      case TextAnchor.CENTER:
        return { x: -50, y: -50 }
      case TextAnchor.TOP_LEFT:
        return { x: 0, y: 0 }
      case TextAnchor.TOP_RIGHT:
        return { x: -100, y: 0 }
      case TextAnchor.BOTTOM_LEFT:
        return { x: 0, y: -100 }
      case TextAnchor.BOTTOM_RIGHT:
        return { x: -100, y: -100 }
      default:
        return { x: 0, y: 0 }
    }
  }

  /**
   * Get the translation for the text element in pixels
   * @param {number} elementWidth - The width of the element
   * @param {number} elementHeight - The height of the element
   * @return {{x: number, y: number}} - The x and y translation in pixels
   */
  getTranslation(elementWidth, elementHeight) {
    const translate = this._getRelativeTranslation()
    let x = (translate.x / 100) * elementWidth
    let y = (translate.y / 100) * elementHeight

    const radialOffsetInPixels =
      this.radialOffset * this.fontSize.replace("px", "")

    switch (this.anchor) {
      case TextAnchor.TOP:
        y += radialOffsetInPixels
        break
      case TextAnchor.BOTTOM:
        y -= radialOffsetInPixels
        break
      case TextAnchor.LEFT:
        x += radialOffsetInPixels
        break
      case TextAnchor.RIGHT:
        x -= radialOffsetInPixels
        break
      case TextAnchor.CENTER:
        break
      case TextAnchor.TOP_LEFT:
        x += radialOffsetInPixels
        y += radialOffsetInPixels
        break
      case TextAnchor.TOP_RIGHT:
        x -= radialOffsetInPixels
        y += radialOffsetInPixels
        break
      case TextAnchor.BOTTOM_LEFT:
        x += radialOffsetInPixels
        y -= radialOffsetInPixels
        break
      case TextAnchor.BOTTOM_RIGHT:
        x -= radialOffsetInPixels
        y -= radialOffsetInPixels
        break
    }
    return { x, y }
  }

  /**
   * Get the transform for the text element
   * @param {number} elementWidth - The width of the element
   * @param {number} elementHeight - The height of the element
   * @return {string} - The transform for the text element
   */
  getTransform(elementWidth, elementHeight) {
    const { x, y } = this.getTranslation(elementWidth, elementHeight)
    return `translate(${x}px, ${y}px)`
  }
}
