/**
 * HashPattern creates a diagonally-striped pattern used to fill a canvas element.
 *
 * Use `createPatternInContext` to create a pattern that can be used as a `fillStyle`.
 */
export class HashPattern {
  /**
   * @param {Object} options
   * @param {number} [options.stripeWidth=4] - width of the pattern's stripes
   * @param {number} [options.gapWidth =10] - width of the gap between the stripes
   * @param {string} [options.stripeColor="#eee"]
   * @param {string} [options.gapColor="#777"]
   */
  constructor({
    stripeWidth = 4,
    gapWidth = 8,
    gapColor = "#eee",
    stripeColor = "#777",
  }) {
    this.stripeWidth = stripeWidth
    this.stripeColor = stripeColor
    this.gapwidth = gapWidth
    this.gapColor = gapColor

    // The tile contains two gaps and two stripes, the widths of which are the tile's hypotenuse.
    const hypot = stripeWidth * 2 + gapWidth * 2
    this.tileSize = Math.round(hypot / Math.SQRT2)

    // Create off-screen canvas for drawing pattern
    this.offscreenCanvas = document.createElement("canvas")

    this.lastDrawnScale = null
    this.lastDrawnPattern = null
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale
   */
  createPatternInContext(ctx, scale) {
    const roundedScale = Math.round(scale)

    if (roundedScale === this.lastDrawnScale) {
      return this.lastDrawnPattern
    }

    this.lastDrawnPattern = this._createPattern(ctx, roundedScale)
    this.lastDrawnScale = roundedScale

    return this.lastDrawnPattern
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} scale
   */
  _createPattern(ctx, scale) {
    const size = this.tileSize * scale

    if (size <= 0) {
      console.error(
        `HashPattern: size (${size}) is too small to draw a pattern. Pattern width and height must be > 0`,
      )
      return
    }

    // Create an off-screen canvas
    this.offscreenCanvas.width = size
    this.offscreenCanvas.height = size

    const offCtx = this.offscreenCanvas.getContext("2d")

    if (this.gapColor) {
      offCtx.fillStyle = this.gapColor
      offCtx.fillRect(0, 0, size, size)
    }

    const lineWidth = this.stripeWidth * scale

    offCtx.strokeStyle = this.stripeColor
    offCtx.lineWidth = lineWidth
    offCtx.lineCap = "square"

    // Draw the tile like so.
    // The top-left and bottom-right corners ensure smooth lines in the repeated pattern.
    //
    //    YJ~     .!JJJJ
    //    !.    .!JYJJYJ
    //        .!JYJJYJ!.
    //      .!JYJJYJ!.
    //    .!JYJJYJ!.
    //    JYJJYJ!.    .!
    //    JJJJ!.     ~JY

    offCtx.beginPath()

    // Draw top-left corner
    offCtx.moveTo(-1, 1)
    offCtx.lineTo(1, -1)

    // Draw main diagonal line
    offCtx.moveTo(0, size)
    offCtx.lineTo(size, 0)

    // Draw bottom-right corner
    offCtx.moveTo(size - 1, size + 1)
    offCtx.lineTo(size + 1, size - 1)

    offCtx.stroke()

    const pattern = ctx.createPattern(this.offscreenCanvas, "repeat")

    pattern.setTransform(
      new DOMMatrix().scale(1 / Math.round(scale), 1 / Math.round(scale)),
    )

    return pattern
  }
}
