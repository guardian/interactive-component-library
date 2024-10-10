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
 * TODO: add leader 'style' option, e.g. kink, direct, manhattan, etc.
 *
 * @typedef _CalloutOptions Internal callout options, with resolved private properties.
 * @property {{ x: number, y: number }} offsetByPct { x, y } offset in percentage of canvas width and height.
 *
 * E.g. { x: 10, y: 20 } will move the callout 10% of the canvas width to the right and 20% of the canvas height down.
 * @property {{ x: number, y: number }} _offsetByFrac { x, y } offset in fraction of canvas width and height, resolved from `offsetByPct` during construction.
 * @property {number} [leaderGap=5] Distance in pixels between the leader line and the text
 * @property {string} [leaderColor="#121212"] Hex colour of the leader line
 * @property {number} [leaderWidth=1] Stroke width of the leader line
 */

/**
 * @typedef {Omit<_CalloutOptions, '_offsetByFrac'>} CalloutOptions
 */

/**
 * @typedef IconOptions
 *
 * @property {"circle"} [shape="circle"]
 * Shape of the icon.
 *
 * TODO: add more shapes?
 * @property {"left" | "right" | "center" } [position="left"] Position of the icon relative to the text.
 *
 * If "center", the icon is placed exactly on the text's coordinates. Use the `anchor` and
 * `radialOffset` properties of `Text` to place the text relative to the icon.
 * place the text relative to the icon.
 * Position of the icon relative to the text
 * @property {number} [size=10]
 * Size of the icon in pixels
 * @property {number} [padding]
 * Distance in pixels between the icon and the text
 * @property {string} [color]
 * Hex colour of the icon, e.g. "#ff0000"
 *
 * For more advanced styling, use the `style` property.
 * @property {import('../styles/Style').Style} [style]
 * Style of the icon.
 *
 * Note that `stroke.position: "inside"` is not currently supported.
 */

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
 * @property {CalloutOptions} [callout] Options for offsetting the text and drawing a leader line.
 *
 * If not provided, no leader line is drawn.
 * @property {IconOptions} [icon] Options for a simple icon displayed next to the text.
 *
 * If not provided, no icon is drawn.
 */

/**
 * Class that represents a text style
 * @class
 * @implements {TextStyle}
 */
export class Text {
  /**
   * Create a text element style
   * @constructor
   * @param {TextStyle} [options] Style options
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
      options?.textShadow ??
      "1px 1px 0px #f6f6f6, -1px -1px 0px #f6f6f6, -1px 1px 0px #f6f6f6, 1px -1px #f6f6f6"
    this.radialOffset = options?.radialOffset || 0

    if (options.callout) {
      /** @type {Partial<_CalloutOptions>} */
      const resolvedCalloutOpts = { ...options.callout }

      resolvedCalloutOpts.offsetByPct ??= { x: 0, y: 0 }
      resolvedCalloutOpts._offsetByFrac = {
        x: resolvedCalloutOpts.offsetByPct.x / 100,
        y: resolvedCalloutOpts.offsetByPct.y / 100,
      }
      resolvedCalloutOpts.leaderGap ??= 5
      resolvedCalloutOpts.leaderColor ??= "#121212"
      resolvedCalloutOpts.leaderWidth ??= 1

      this.callout = /** @type {_CalloutOptions} */ (resolvedCalloutOpts)
    }

    if (options.icon) {
      this.icon = options.icon
      this.icon.shape ??= "circle"
      this.icon.position ??= "left"
      this.icon.size ??= 10
      this.icon.padding ??= 5
    }
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
      this.radialOffset * parseInt(this.fontSize.replace("px", ""))

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
