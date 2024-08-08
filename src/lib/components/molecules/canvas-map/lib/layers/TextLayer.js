import { TextLayerRenderer } from "../renderers/TextLayerRenderer"
import { Style, Text } from "../styles"
import { Dispatcher } from "../events/Dispatcher"
import { combineExtents } from "../util/extent"
import { MapEvent } from "../events"
import { VectorSource } from "../sources/VectorSource"
import { MapContext } from "$molecules/canvas-map/context/MapContext"
import { useEffect, useContext } from "preact/hooks"

/** @typedef {Omit<ConstructorParameters<typeof TextLayer>[0], "source">} TextLayerOptions */
/** @typedef {TextLayerOptions & { features: import("../Feature").Feature[]}} TextLayerComponentProps */

export class TextLayer {
  /** @param {TextLayerComponentProps} props */
  static Component({ features, ...options }) {
    const { map } = useContext(MapContext)

    useEffect(() => {
      if (!map) return

      const model = TextLayer.with(features, options)
      map.addLayer(model)

      return () => {
        map.removeLayer(model)
      }
    })
  }

  /**
   * @param {import("../Feature").Feature[]} features
   * @param {TextLayerOptions} options
   */
  static with(features, options) {
    const source = new VectorSource({ features })
    return new TextLayer({ source, ...options })
  }

  /**
   * @param {Object} params
   * @param {VectorSource} params.source
   * @param {Style} [params.style=undefined]
   * @param {number} [params.minZoom=0]
   * @param {number} [params.opacity=1]
   * @param {boolean} [params.declutter=true]
   * @param {boolean} [params.drawCollisionBoxes=false]
   */
  constructor({
    source,
    style,
    minZoom = 0,
    opacity = 1,
    declutter = true,
    drawCollisionBoxes = false,
  }) {
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
    this.dispatcher.dispatch(MapEvent.CHANGE)
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
