import { replaceChildren } from "../util/dom"
import RBush from "rbush"

/**
 * @typedef {Object} CanvasSingleton
 * @property {() => CanvasRenderingContext2D} getContext2d
 * @property {() => HTMLDivElement} getContainer
 * @property {() => boolean} isInitialised
 *
 * @typedef {Object} FrameState
 */

export class MapRenderer {
  constructor(map) {
    this.map = map

    const container = map.viewPort
    if (container) {
      this._element = document.createElement("div")
      this._element.className = "gv-layer-container"
      const style = this._element.style
      style.position = "absolute"
      style.width = "100%"
      style.height = "100%"
      style.zIndex = "0"

      container.insertBefore(this._element, container.firstChild || null)
    }
  }

  renderFrame(frameState, canvas) {
    const { zoomLevel, projection, sizeInPixels } = frameState.viewState

    const layers = this.map.layers

    const mapElements = []
    const canvasElement = canvas || createCanvas(sizeInPixels)

    const visibleLayers = layers.filter((layer) => {
      return zoomLevel > (layer.minZoom || 0)
    })

    const renderLayer = (layer, declutterTree) => {
      const viewState = frameState.viewState

      if (layer.projection) {
        viewState.projection = layer.projection
      }

      // Render the layer, providing the main canvas
      const element = layer.renderFrame(
        { ...frameState, viewState, declutterTree },
        canvasElement,
      )

      // If renderFrame created a new element, add it to the list of elements we add to the map
      // container. This is currently only used for the TextLayer, each of which puts its layers in
      // a new div.
      if (element) {
        mapElements.push(element)
      }

      // reset to map projection
      viewState.projection = projection
    }

    const declutterTree = new RBush()

    for (const layer of visibleLayers) {
      if (layer.declutter) {
        renderLayer(layer, declutterTree)
      } else {
        renderLayer(layer)
      }
    }

    if (this._element) {
      replaceChildren(this._element, [canvasElement, ...mapElements])
    }
  }
}

/**
 * @param {[number, number]} sizeInPixels
 */
function createCanvas(sizeInPixels) {
  const canvas = document.createElement("canvas")
  canvas.className = "gv-map-layer"
  canvas.style.position = "absolute"
  canvas.style.width = "100%"
  canvas.style.height = "100%"

  canvas.width = sizeInPixels[0]
  canvas.height = sizeInPixels[1]

  return canvas
}
