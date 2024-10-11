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

    this._element = document.createElement("div")
    this._element.className = "gv-layer-container"
    const style = this._element.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"
    style.zIndex = "0"

    const container = map.viewPort
    container.insertBefore(this._element, container.firstChild || null)
  }

  renderFrame(frameState) {
    const { zoomLevel, projection, sizeInPixels } = frameState.viewState

    const layers = this.map.layers

    const mapElements = []

    const visibleLayers = layers.filter((layer) => {
      return zoomLevel > (layer.minZoom || 0)
    })

    const canvasSingleton = makeCanvasSingleton(sizeInPixels)

    const renderLayer = (layer, declutterTree) => {
      const viewState = frameState.viewState

      if (layer.projection) {
        viewState.projection = layer.projection
      }

      // Render the layer, providing the canvas singleton in case this layer wants to render our
      // canvas singleton
      const newContainer = layer.renderFrame(
        { ...frameState, viewState, declutterTree },
        canvasSingleton,
      )

      // If renderFrame created a new element, add it to the list of elements we add to the map
      // container. This is currently only used for the TextLayer, each of which puts its layers in
      // a new div.
      if (newContainer) {
        mapElements.push(newContainer)
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

    if (canvasSingleton.isInitialised()) {
      // If canvas was used by any layer, add it to the map container, beneath all other elements so
      // they're not occluded
      replaceChildren(this._element, [
        canvasSingleton.getContainer(),
        ...mapElements,
      ])
    } else {
      replaceChildren(this._element, mapElements)
    }
  }
}

/**
 * @param {[number, number]} sizeInPixels
 * @returns {CanvasSingleton}
 */
function makeCanvasSingleton(sizeInPixels) {
  /** @type {HTMLDivElement} */
  let canvasLayer
  let canvasContext2d

  return {
    getContext2d: () => {
      if (!canvasLayer) {
        canvasLayer = createCanvasMapLayer(sizeInPixels)
        canvasContext2d = canvasLayer.firstElementChild.getContext("2d")
      }

      return canvasContext2d
    },
    getContainer: () => {
      if (!canvasLayer) {
        canvasLayer = createCanvasMapLayer(sizeInPixels)
        canvasContext2d = canvasLayer.firstElementChild.getContext("2d")
      }

      return canvasLayer
    },
    isInitialised: () => !!canvasLayer,
  }
}

/**
 * @param {[number, number]} sizeInPixels
 */
function createCanvasMapLayer(sizeInPixels) {
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

  canvas.width = sizeInPixels[0]
  canvas.height = sizeInPixels[1]

  container.appendChild(canvas)

  return container
}
