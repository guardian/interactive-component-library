import { FeatureRenderer } from "./FeatureRenderer"

export class VectorLayerRenderer {
  constructor(layer) {
    this.layer = layer
    this.featureRenderer = new FeatureRenderer()
  }

  renderFrame(frameState, targetElement) {
    const { projection, sizeInPixels, visibleExtent, transform } = frameState.viewState

    const container = this.getOrCreateContainer(targetElement, sizeInPixels)
    const context = container.firstElementChild.getContext("2d")

    context.save()

    context.translate(transform.x, transform.y)
    context.scale(transform.k, transform.k)

    // set defaults
    context.lineJoin = "round"
    context.lineCap = "round"

    // set opacity
    context.globalAlpha = this.layer.opacity

    const source = this.layer.source
    const features = source.getFeaturesInExtent(visibleExtent)

    for (const feature of features) {
      context.save()
      const styleFunction = feature.getStyleFunction() || this.layer.getStyleFunction()
      const featureStyle = styleFunction(feature)
      if (!featureStyle) continue
      this.featureRenderer.setStyle(featureStyle)
      this.featureRenderer.render(frameState, feature, context)
      context.restore()
    }

    if (Object.prototype.hasOwnProperty.call(projection, "getCompositionBorders")) {
      context.beginPath()
      context.lineWidth = 1 / transform.k
      context.strokeStyle = "#999"
      projection.drawCompositionBorders(context)
      context.stroke()
    }

    context.restore()

    return container
  }

  getOrCreateContainer(targetElement, sizeInPixels) {
    let container = null
    let containerReused = false
    let canvas = targetElement && targetElement.firstElementChild
    if (canvas instanceof HTMLCanvasElement) {
      // use container from previously rendered layer
      container = targetElement
      containerReused = true
    } else if (this._container) {
      // reuse existing container for this layer
      container = this._container
    } else {
      // Create new container
      container = this.createContainer()
    }

    if (!containerReused) {
      // setting the size of the canvas also clears it
      const canvas = container.firstElementChild
      canvas.width = sizeInPixels[0]
      canvas.height = sizeInPixels[1]
    }

    this._container = container
    return container
  }

  createContainer() {
    const container = document.createElement("div")
    container.className = "gv-map-layer"

    let style = container.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"

    const canvas = document.createElement("canvas")
    style = canvas.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"
    container.appendChild(canvas)

    return container
  }
}
