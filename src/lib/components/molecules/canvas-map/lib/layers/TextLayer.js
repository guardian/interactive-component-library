import { TextLayerRenderer } from "../renderers/TextLayerRenderer"
import { Style, Text } from "../styles"
import { Dispatcher } from "../events/Dispatcher"
import { combineExtents } from "../util/extent"
import { MapEvent } from "../events"
import { VectorSource } from "../sources/VectorSource"
import { MapContext } from "../../context/MapContext"
import { useEffect, useContext, useMemo } from "preact/hooks"
import { FeatureCollection } from "../FeatureCollection"

/** @typedef {Omit<ConstructorParameters<typeof TextLayer>[0], "source">} TextLayerOptions */
/** @typedef {TextLayerOptions & { features: import("../Feature").Feature[] | import("../FeatureCollection").FeatureCollection }} TextLayerComponentProps */

export class TextLayer {
  /** @param {TextLayerComponentProps} props */
  static Component({
    features: featureCollection,
    style,
    minZoom,
    opacity,
    declutter,
    declutterBoundingBoxPadding,
    drawCollisionBoxes,
    onClick,
    onHover,
    restyleOnHover,
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

        return TextLayer.with(features, {
          style,
          minZoom,
          opacity,
          declutter,
          declutterBoundingBoxPadding,
          drawCollisionBoxes,
          onClick,
          onHover,
          restyleOnHover,
        })
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        featureCollection,
        minZoom,
        opacity,
        declutter,
        declutterBoundingBoxPadding,
        drawCollisionBoxes,
        onClick,
        onHover,
        restyleOnHover,
      ],
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
   * @param {TextLayerOptions} options
   */
  static with(features, options) {
    const source = new VectorSource({ features })
    return new TextLayer({ source, ...options })
  }

  /**
   * @constructor
   * @param {Object} params
   * @param {VectorSource} params.source
   * @param {Style | ((feature: import('../Feature').Feature, zoom: number, isHovering: boolean) => Style)} [params.style=undefined]
   * @param {number} [params.minZoom=0]
   * @param {number} [params.opacity=1]
   * @param {boolean} [params.declutter=true]
   * @param {number} [params.declutterBoundingBoxPadding=2] Padding added to the bounding box around the TextLayer, that's used to detect collisions for decluttering.
   * @param {boolean} [params.drawCollisionBoxes=false]
   * @param {(feature: import('../Feature').Feature, event: MouseEvent) => void} [params.onClick]
   * @param {(feature: import('../Feature').Feature, event: MouseEvent) => (() => void) | void} [params.onHover]
   * A callback that's called when the mouse hovers over a feature in this layer. The callback is
   * called with the hovered feature, and the mouse event.
   *
   * The callback can optionally return a cleanup function that will be called when the mouse leaves this feature.
   *
   * Note that this callback is attached to the "pointerover" and "pointerout" events, so touch
   * events will not trigger it.
   * @param {boolean} [params.restyleOnHover] If true, the layer will re-render when the mouse hovers over a feature.
   *
   * The provided style function will be called with the `isHovering` parameter set to `true` for the hovered feature.
   */
  constructor({
    source,
    style,
    minZoom = 0,
    opacity = 1,
    declutter = true,
    declutterBoundingBoxPadding = 2,
    drawCollisionBoxes = false,
    onClick,
    onHover,
    restyleOnHover,
  }) {
    // NOTE: unfortunately JSDoc isn't smart enough to infer class property types, so we have to
    // declare the types like so
    /**
     * @type {VectorSource}
     * @public
     */
    this.source = source
    /**
     * @type {Style|import("../styles").StyleFunction}
     */
    this._style = style
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
    this.declutter = declutter
    /**
     * @type {boolean}
     * @public
     */
    this.drawCollisionBoxes = drawCollisionBoxes

    /**
     * @type {number}
     * @public
     */
    this.declutterBoundingBoxPadding = declutterBoundingBoxPadding

    this.onClick = onClick

    this.onHover = onHover

    this.restyleOnHover = restyleOnHover

    /**
     * @type {TextLayerRenderer}
     * @public
     */
    this.renderer = new TextLayerRenderer(this)
    /**
     * @type {Dispatcher}
     * @public
     */
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

  renderFrame(frameState, targetElement) {
    return this.renderer.renderFrame(frameState, targetElement)
  }
}

// Set displayName so we don't just see "Component" in React DevTools
TextLayer.Component.displayName = "TextLayer"
