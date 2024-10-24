import { FeatureRenderer } from "./FeatureRenderer"

export class VectorLayerRenderer {
  /**
   * @constructor
   * @param {import('../layers').VectorLayer} layer
   */
  constructor(layer) {
    /**
     * @type {import('../layers').VectorLayer}
     */
    this.layer = layer
    this.featureRenderer = new FeatureRenderer()
  }

  /**
   * @param {HTMLCanvasElement} canvas
   */
  renderFrame(frameState, canvas) {
    if (this.layer.opacity === 0) return null

    const { projection, visibleExtent, transform } = frameState.viewState

    const context = canvas.getContext("2d")

    context.save()

    context.translate(transform.x, transform.y)
    context.scale(transform.k, transform.k)

    // set defaults
    context.lineJoin = "round"
    context.lineCap = "round"

    // set opacity
    context.globalAlpha = this.layer.opacity

    // TODO: why isn't this typed?
    const source = this.layer.source
    const features = source.getFeaturesInExtent(visibleExtent)

    for (const feature of features) {
      /** @type {import("../styles").StyleFunction} */
      const styleFunction =
        feature.getStyleFunction() || this.layer.getStyleFunction()

      const featureStyle = styleFunction(feature, transform.k)

      if (featureStyle?.stroke || featureStyle?.fill) {
        context.save()
        this.featureRenderer.setStyle(featureStyle)
        this.featureRenderer.setFeature(feature)
        this.featureRenderer.render(frameState, context)
        context.restore()
      }
    }

    if (
      Object.prototype.hasOwnProperty.call(projection, "getCompositionBorders")
    ) {
      context.beginPath()
      context.lineWidth = 1 / transform.k
      context.strokeStyle = "#999"
      projection.drawCompositionBorders(context)
      context.stroke()
    }

    context.restore()
  }
}
