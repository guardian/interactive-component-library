import { View } from "./View"
import { sizeForElement } from "./util/size"
import { arrayEquals } from "./util/array"
import { containsCoordinate } from "./util/extent"
import { MapRenderer } from "./renderers/MapRenderer"
import { zoom, zoomIdentity } from "d3-zoom"
import { select } from "d3-selection"
import { timer } from "d3-timer"
import { MapEvent, Dispatcher } from "./events"
import "d3-transition"

/**
 * Map component that renders into a canvas
 * It has built-in support for zooming and panning, as well as support for vector layers
 */
export class Map {
  /**
   * @constructor
   * @param {Object} config - The configuration for the map.
   * @param {Object} config.view - The view configuration for the map.
   * @param {boolean} [config.debug] - Whether to enable debug mode or not.
   * @param {boolean} config.allowZoomPan - Whether to enable zoom and pan functionality or not.
   * @param {HTMLElement} [config.target] - The target element to render the map into.
   */
  constructor(config) {
    if (config.debug) {
      // eslint-disable-next-line no-console
      console.log("Map config", config)
    }

    this.allowZoomPan = config.allowZoomPan

    this.options = config
    this.view = new View(config.view, config.debug)

    this.target = config.target
    this.layers = []

    // Create event dispatcher
    this.dispatcher = new Dispatcher(this)

    const createViewport = () => {
      this._viewport = document.createElement("div")
      this._viewport.className = "gv-map"
      this._viewport.style.position = "relative"
      this._viewport.style.overflow = "hidden"
      this._viewport.style.width = "100%"
      this._viewport.style.height = "100%"
      this.target.appendChild(this._viewport)

      // Show help text when single touch moved
      this._viewport.addEventListener("touchmove", (event) => {
        if (
          event.targetTouches.length < 2 &&
          this._collaborativeGesturesEnabled
        ) {
          this._filterEventCallback(true)
        }
      })

      // Create resize observer
      this._resizeObserver = new ResizeObserver(() => {
        this._updateSize()
      })
      // Trigger fires when observer is first added, ensuring _updateSize() is called
      this._resizeObserver.observe(this.target)
    }

    // Create container div and add to viewport
    if (this.target) createViewport()

    // Create renderer
    this._renderer = new MapRenderer(this)
  }

  destroy() {
    this._resizeObserver.disconnect()
    this._viewport?.remove()
  }

  /** PUBLIC GETTERS */

  get size() {
    return this._size
  }

  get viewPort() {
    return this._viewport
  }

  get zoomScale() {
    return this.view.transform.k
  }

  get isTransitioning() {
    return this._isTransitioning
  }

  /** PUBLIC METHODS */

  collaborativeGesturesEnabled(enabled) {
    if (enabled === undefined) return this._collaborativeGesturesEnabled
    this._collaborativeGesturesEnabled = enabled
  }

  onFilterEvent(callback) {
    this._filterEventCallback = callback
  }

  fitObject(geoJSON) {
    this.view.fitObject(geoJSON)
    this._requestRender()
  }

  addLayer(layer) {
    this.addLayers([layer])
  }

  addLayers(layers) {
    this.layers = this.layers.concat(layers)

    layers.forEach((layer) => {
      layer.on(MapEvent.CHANGE, () => {
        this._requestRender()
      })
    })

    this._requestRender()
  }

  setLayers(layers) {
    if (layers === this.layers) {
      return
    }

    new Array(...this.layers).forEach((layer) => {
      if (!layers.includes(layer)) {
        this.removeLayer(layer)
      }
    })

    this.layers = []
    this.addLayers(layers)
  }

  removeLayer(layer) {
    layer.tearDown()
    const layerIndex = this.layers.indexOf(layer)
    if (layerIndex < 0) return
    this.layers.splice(layerIndex, 1)
  }

  async zoomIn(options) {
    return this.zoomTo(this.zoomScale * 2, options)
  }

  async zoomOut(options) {
    return this.zoomTo(this.zoomScale * 0.5, options)
  }

  async zoomTo(zoomScale, options = { duration: 500 }) {
    return select(this._viewport)
      .transition()
      .duration(options.duration)
      .call(this._zoomBehaviour.scaleTo, zoomScale)
      .end()
  }

  zoomToFeature(
    feature,
    focalPoint,
    padding = { top: 40, right: 40, bottom: 40, left: 40 },
  ) {
    const extent = feature.getExtent()

    const {
      minX: featureX,
      minY: featureY,
      width: featureWidth,
      height: featureHeight,
    } = this.view.projectExtent(extent)
    const [viewPortWidth, viewPortHeight] = this.view.viewPortSize

    const paddedViewPortWidth = viewPortWidth - padding.left - padding.right
    const paddedViewPortHeight = viewPortHeight - padding.top - padding.bottom

    const featureScale = Math.min(
      paddedViewPortWidth / featureWidth,
      paddedViewPortHeight / featureHeight,
    )
    const zoomScale = Math.min(this.view.scaleExtent[1], featureScale)

    const scaledPadding = {
      top: padding.top / zoomScale,
      right: padding.right / zoomScale,
      bottom: padding.bottom / zoomScale,
      left: padding.left / zoomScale,
    }

    const paddedFeatureBounds = {
      x: featureX - scaledPadding.left,
      y: featureY - scaledPadding.top,
      width: featureWidth + scaledPadding.left + scaledPadding.right,
      height: featureHeight + scaledPadding.top + scaledPadding.bottom,
    }

    const newTransform = zoomIdentity
      .translate(viewPortWidth / 2, viewPortHeight / 2)
      .scale(zoomScale)
      .translate(
        -(paddedFeatureBounds.x + paddedFeatureBounds.width / 2),
        -(paddedFeatureBounds.y + paddedFeatureBounds.height / 2),
      )

    select(this._viewport)
      .transition()
      .duration(500)
      .call(this._zoomBehaviour.transform, newTransform, focalPoint)
  }

  /** @param {import("./layers").Layer[]} layers */
  hasLayers(layers) {
    if (layers.length !== this.layers.length) {
      return false
    }

    for (let i = 0; i < layers.length; i++) {
      if (layers[i] !== this.layers[i]) {
        return false
      }
    }

    return true
  }

  async resetZoom(options) {
    return this.zoomTo(1, options)
  }

  findFeatures(point) {
    // find map coordinate based on projection
    const mapCoordinate = this.view.invert(point)

    const matchingFeatures = []
    for (const layer of this.layers) {
      const layerExtent = layer.getExtent()
      if (
        layer.hitDetectionEnabled &&
        containsCoordinate(layerExtent, mapCoordinate)
      ) {
        const features = layer.findFeatures(mapCoordinate)
        if (features) {
          matchingFeatures.push(...features)
        }
      }
    }

    return matchingFeatures
  }

  changed() {
    this._requestRender()
  }

  async transition(options = { duration: 500, ease: (t) => t }, callback) {
    const ease = options.ease
    return new Promise((resolve) => {
      this._isTransitioning = true
      this.dispatcher.dispatch(MapEvent.TRANSITION_START)

      const _timer = timer((elapsed) => {
        const t = Math.min(elapsed / options.duration, 1)
        callback(ease(t))
        this._renderFrame()
        if (elapsed >= options.duration) {
          _timer.stop()
          this._isTransitioning = false
          this.dispatcher.dispatch(MapEvent.TRANSITION_END)
          resolve()
        }
      })
    })
  }

  /** PRIVATE METHODS */

  _updateSize() {
    const targetElement = this.target

    let newSize = sizeForElement(targetElement)
    const oldSize = this.size
    if (newSize && (!oldSize || !arrayEquals(newSize, oldSize))) {
      this._size = newSize
      this._updateViewportSize(newSize)
    }
  }

  _updateViewportSize(size) {
    const view = this.view
    if (view) {
      view.viewPortSize = size
      this._createZoomBehaviour(size)
    }

    this._requestRender()
  }

  _createZoomBehaviour(viewPortSize) {
    if (this._zoomBehaviour) {
      this._zoomBehaviour.on("zoom", null)
    }

    // Create d3-zoom object to allow panning and zooming
    this._zoomBypassKey =
      navigator.userAgent.indexOf("Mac") !== -1 ? "metaKey" : "ctrlKey"
    this._zoomBehaviour = zoom()
      .extent([[0, 0], viewPortSize])
      .translateExtent([[0, 0], viewPortSize])
      .scaleExtent(this.view.scaleExtent)
      .filter((event) => {
        const filterEvent = (filter) => {
          this._filterEventCallback?.(filter)
          return !filter
        }

        // only allow wheel events when zoom bypass key is pressed
        if (event.type === "wheel" && !event[this._zoomBypassKey]) {
          return filterEvent(true)
        }

        if ("targetTouches" in event && this.collaborativeGesturesEnabled) {
          if (event.targetTouches.length < 2) {
            // ignore single touches
            return false
          }
          // stop event from propagating when there are two target touches
          event.preventDefault()
          return filterEvent(false)
        }

        // default to d3 implementation
        return (!event.ctrlKey || event.type === "wheel") && !event.button
      })
      .on("zoom", (event) => {
        if (!this.allowZoomPan) {
          return
        }
        this.view.transform = event.transform
        this._requestRender()

        this.dispatcher.dispatch(MapEvent.ZOOM, {
          zoomScale: event.transform.k,
        })
      })

    // Add zoom behaviour to viewport
    select(this._viewport).call(this._zoomBehaviour)
  }

  _requestRender() {
    if (
      !this._renderer ||
      !!this._animationFrameRequestID ||
      this._isTransitioning ||
      typeof window === "undefined"
    )
      return
    this._animationFrameRequestID = requestAnimationFrame(
      this._renderFrame.bind(this),
    )
  }

  _renderFrame(_, canvas) {
    const frameState = {
      size: this.size,
      viewState: this.view.getState(),
      debug: this.options.debug || false,
    }

    this._renderer.renderFrame(frameState, canvas)
    this._animationFrameRequestID = null
  }

  renderToCanvas(canvas) {
    this.view.viewPortSize = [canvas.width, canvas.height]
    this._renderFrame(null, canvas)
  }
}

Map.Component = undefined
