import { VectorLayerRenderer } from "../renderers/VectorLayerRenderer"
import { Style, Stroke } from "../styles"
import { combineExtents } from "../util/extent"
import { Dispatcher, MapEvent } from "../events"
import { VectorSource } from "../sources/VectorSource"
import { useEffect, useContext, useMemo } from "preact/hooks"
import { MapContext } from "../../context/MapContext"
import { FeatureCollection } from "../FeatureCollection"

/** @typedef {Omit<ConstructorParameters<typeof VectorLayer>[0], "source">} VectorLayerOptions */
/** @typedef {VectorLayerOptions & { features: import("../Feature").Feature[] | import("../FeatureCollection").FeatureCollection }} VectorLayerComponentProps */

export class VectorLayer {
  /** @param {VectorLayerComponentProps} props */
  static Component({
    features: featureCollection,
    style,
    minZoom,
    opacity,
    hitDetectionEnabled = true,
  }) {
    const { registerLayer, unregisterLayer } = useContext(MapContext)

    // We recreate layer whenever these properties change, which cannot be changed on the fly
    // and require recreation
    const layer = useMemo(
      () => {
        const features =
          featureCollection instanceof FeatureCollection
            ? featureCollection.features
            : /** @type {import("../Feature").Feature[]} */ (featureCollection)

        return VectorLayer.with(features, {
          style,
          minZoom,
          opacity,
          hitDetectionEnabled,
        })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [featureCollection, minZoom, opacity, hitDetectionEnabled],
    )

    useEffect(() => {
      registerLayer(layer, this)

      return () => {
        unregisterLayer(layer)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layer])

    useEffect(() => {
      // If the style prop changes, just update the layer, style can be changed without creating a
      // new layer
      layer.style = style
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [style])

    return null
  }

  /**
   * @param {import("../Feature").Feature[]} features
   * @param {VectorLayerOptions} options
   */
  static with(features, options) {
    const source = new VectorSource({ features })
    return new VectorLayer({ source, ...options })
  }

  /**
   * @param {Object} params
   * @param {VectorSource} params.source
   * @param {Style | (() => Style)} [params.style=undefined]
   * @param {number} [params.minZoom=0]
   * @param {number} [params.opacity=1]
   * @param {boolean} [params.hitDetectionEnabled=true]
   */
  constructor({
    source,
    style,
    minZoom = 0,
    opacity = 1,
    hitDetectionEnabled = true,
  }) {
    // NOTE: unfortunately JSDoc isn't smart enough to infer class property types, so we have to
    // declare the types like so
    /**
     * @type {VectorSource}
     * @public
     */
    this.source = source
    /**
     * @type {Dispatcher}
     * @public
     */
    this.dispatcher = new Dispatcher(this)
    /**
     * @type {VectorLayerRenderer}
     * @public
     */
    this.renderer = new VectorLayerRenderer(this)
    /**
     * @type {number}
     * @public
     */
    this.minZoom = minZoom
    /**
     * @type {number}
     * @public
     */
    this.opacity = opacity
    /**
     * @type {boolean}
     * @public
     */
    this.hitDetectionEnabled = hitDetectionEnabled
    /**
     * @type {Style|import("../styles").StyleFunction}
     */
    this._style = style
  }

  get source() {
    // TODO: should this be this.source, as per constructor?
    return this._source
  }

  set source(source) {
    if (this._source && source !== this._source) {
      this._source.tearDown()
    }
    this._source = source

    source.on(MapEvent.CHANGE, () => {
      this._extent = null
      this.dispatcher.dispatch(MapEvent.CHANGE)
    })
  }

  setRawProjection(projection) {
    this.projection = projection
  }

  tearDown() {
    this.dispatcher = null
  }

  get style() {
    if (this._style) return this._style

    // create default vector style
    const defaultStyle = new Style({
      stroke: new Stroke(),
    })
    return defaultStyle
  }

  set style(style) {
    this._style = style
    this.dispatcher.dispatch(MapEvent.CHANGE)
  }

  /**
   * @returns {import("../styles/Style").StyleFunction}
   */
  getStyleFunction() {
    const style = this.style
    if (typeof style === "function") return style
    return () => {
      return style
    }
  }

  /**
   * Get the extent of the features in the layer.
   * @returns {import("../util").Extent | null} The extent of the features in the layer, or null if the layer is empty.
   */
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

  findFeatures(coordinate) {
    if (!this.hitDetectionEnabled) return
    return this.source.getFeaturesAtCoordinate(coordinate)
  }

  renderFrame(frameState, canvas) {
    return this.renderer.renderFrame(frameState, canvas)
  }
}

// Set displayName so we don't just see "Component" in React DevTools
VectorLayer.Component.displayName = "VectorLayer"
