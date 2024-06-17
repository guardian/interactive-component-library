import { TextLayerRenderer } from "../renderers/TextLayerRenderer"
import { Style, Text } from "../styles"
import { Dispatcher } from "../events/Dispatcher"
import { combineExtents } from "../util/extent"
import { EventType } from "../events"
import { VectorSource } from "../sources/VectorSource"

export class TextLayer {
  static with(features, options) {
    const source = new VectorSource({ features })
    return new TextLayer({ source, ...options })
  }

  constructor({ source, style, minZoom = 0, opacity = 1, declutter = true, drawCollisionBoxes = false }) {
    this.source = source
    this._style = style
    this.minZoom = minZoom
    this.opacity = opacity
    this.declutter = declutter
    this.drawCollisionBoxes = drawCollisionBoxes
    this.renderer = new TextLayerRenderer(this)
    this.dispatcher = new Dispatcher(this)
  }

  tearDown() {
    this.dispatcher = null
  }

  get style() {
    if (this._style) return this._style

    // create default vector style
    const defaultStyle = new Style({
      text: new Text(),
    })
    return defaultStyle
  }

  set style(style) {
    this._style = style
    this.dispatcher.dispatch(EventType.CHANGE)
  }

  getExtent() {
    if (this._extent) return this._extent

    const features = this.source.getFeatures()
    const extent = features.reduce((combinedExtent, feature) => {
      const featureExtent = feature.getExtent()
      if (!combinedExtent) return featureExtent
      return combineExtents(featureExtent, combinedExtent)
    }, null)
    this._extent = extent
    return extent
  }

  getStyleFunction() {
    const style = this.style
    if (typeof style === "function") return style
    return () => {
      return style
    }
  }

  renderFrame(frameState, targetElement) {
    return this.renderer.renderFrame(frameState, targetElement)
  }
}
