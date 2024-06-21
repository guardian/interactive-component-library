import { hasArea } from "./util/size"
import { arrayEquals } from "./util/array"
import { containsCoordinate } from "./util/extent"
import { MapRenderer } from "./renderers/MapRenderer"
import { zoom, zoomIdentity } from "d3-zoom"
import { select } from "d3-selection"
import { timer } from "d3-timer"
import { MapEvent, Dispatcher } from "./events"
import "d3-transition"

export class Map {
  constructor(options) {
    this.options = options
    this.view = options.view
    this.target = options.target
    this.layers = []

    // Create event dispatcher
    this.dispatcher = new Dispatcher(this)

    // Create container div and add to viewport
    this._viewport = document.createElement("div")
    this._viewport.className = "gv-map"
    this._viewport.style.position = "relative"
    this._viewport.style.overflow = "hidden"
    this._viewport.style.top = 0
    this._viewport.style.left = 0
    this._viewport.style.width = "100%"
    this._viewport.style.height = "100%"
    this.target.appendChild(this._viewport)

    // Create renderer
    this._renderer = new MapRenderer(this)

    // Create resize observer
    this._resizeObserver = new ResizeObserver(() => this._updateSize())
    // Trigger fires when observer is first added, ensuring _updateSize() is called
    this._resizeObserver.observe(this.target)

    // Create d3-zoom object to allow panning and zooming
    this.view.transform = zoomIdentity
    this._zoomBypassKey = navigator.userAgent.indexOf("Mac") !== -1 ? "metaKey" : "ctrlKey"
    this._zoomBehaviour = zoom()
      .scaleExtent(this.view.scaleExtent)
      .filter((event) => {
        const filterEvent = (filter) => {
          this._filterEventCallback(filter)
          return !filter
        }

        // only allow wheel events when zoom bypass key is pressed
        if (event.type === "wheel" && !event[this._zoomBypassKey]) {
          return filterEvent(true)
        }

        if ("targetTouches" in event) {
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
        this.view.transform = event.transform
        this._requestRender()

        this.dispatcher.dispatch(MapEvent.ZOOM, { currentZoomLevel: event.transform.k })
      })

    // Add zoom behaviour to viewport
    select(this._viewport).call(this._zoomBehaviour)

    // Show help text when single touch moved
    this._viewport.addEventListener("touchmove", (event) => {
      if (event.targetTouches.length < 2) {
        this._filterEventCallback(true)
      }
    })
  }

  destroy() {
    this._resizeObserver.disconnect()
    this._viewport.remove()
  }

  /** PUBLIC GETTERS */

  get size() {
    return this._size
  }

  get viewPort() {
    return this._viewport
  }

  get zoomLevel() {
    return this.view.transform.k
  }

  /** PUBLIC METHODS */

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
    return this.zoomTo(this.zoomLevel * 2, options)
  }

  async zoomOut(options) {
    return this.zoomTo(this.zoomLevel * 0.5, options)
  }

  async zoomTo(zoomLevel, options = { duration: 500 }) {
    return select(this._viewport).transition().duration(options.duration).call(this._zoomBehaviour.scaleTo, zoomLevel).end()
  }

  zoomToFeature(feature, focalPoint, padding = { top: 40, right: 40, bottom: 40, left: 40 }) {
    const extent = feature.getExtent()
    const [[featureX, featureY], [featureWidth, featureHeight]] = this.view.boundsForExtent(extent)
    const [viewPortWidth, viewPortHeight] = this.view.viewPortSize

    const paddedViewPortWidth = viewPortWidth - padding.left - padding.right
    const paddedViewPortHeight = viewPortHeight - padding.top - padding.bottom

    const featureScale = Math.min(paddedViewPortWidth / featureWidth, paddedViewPortHeight / featureHeight)
    const zoomScale = Math.min(this.view.maxZoom, featureScale)

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
      .translate(-(paddedFeatureBounds.x + paddedFeatureBounds.width / 2), -(paddedFeatureBounds.y + paddedFeatureBounds.height / 2))

    select(this._viewport).transition().duration(500).call(this._zoomBehaviour.transform, newTransform, focalPoint)
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
      if (layer.hitDetectionEnabled && containsCoordinate(layerExtent, mapCoordinate)) {
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

  async transition(options = { duration: 500 }, callback) {
    const ease = options.ease || ((t) => t)
    return new Promise((resolve) => {
      this._isTransitioning = true

      const _timer = timer((elapsed) => {
        const t = Math.min(elapsed / options.duration, 1)
        callback(ease(t))
        this._renderFrame()
        if (elapsed >= options.duration) {
          _timer.stop()
          this._isTransitioning = false
          resolve()
        }
      })
    })
  }

  /** PRIVATE METHODS */

  _updateSize() {
    const targetElement = this.target

    let size
    if (targetElement) {
      const computedStyle = getComputedStyle(targetElement)
      const width =
        targetElement.offsetWidth -
        parseFloat(computedStyle["borderLeftWidth"]) -
        parseFloat(computedStyle["paddingLeft"]) -
        parseFloat(computedStyle["paddingRight"]) -
        parseFloat(computedStyle["borderRightWidth"])
      const height =
        targetElement.offsetHeight -
        parseFloat(computedStyle["borderTopWidth"]) -
        parseFloat(computedStyle["paddingTop"]) -
        parseFloat(computedStyle["paddingBottom"]) -
        parseFloat(computedStyle["borderBottomWidth"])
      if (!isNaN(width) && !isNaN(height)) {
        size = [width, height]
        if (!hasArea(size) && !!(targetElement.offsetWidth || targetElement.offsetHeight || targetElement.getClientRects().length)) {
          console.warn("No map visible because the map container's width or height are 0.")
        }
      }
    }

    const oldSize = this.size
    if (size && (!oldSize || !arrayEquals(size, oldSize))) {
      this._size = size
      this._updateViewportSize(size)
    }
  }

  _updateViewportSize(size) {
    const view = this.view
    if (view) {
      view.viewPortSize = size
    }

    // constrain zoom to size of the viewport
    this._zoomBehaviour.extent([[0, 0], size])
    this._zoomBehaviour.translateExtent([[0, 0], size])

    this._requestRender()
  }

  _requestRender() {
    if (!this._renderer || !!this._animationFrameRequestID || this._isTransitioning) return
    this._animationFrameRequestID = requestAnimationFrame(this._renderFrame.bind(this))
  }

  _renderFrame() {
    const frameState = {
      size: this.size,
      viewState: this.view.getState(),
    }

    this._renderer.renderFrame(frameState)
    this._animationFrameRequestID = null
  }
}
