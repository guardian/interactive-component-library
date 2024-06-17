import { replaceChildren } from "../util/dom"
import RBush from "rbush"

export class MapRenderer {
  constructor(map) {
    this.map = map

    this._element = document.createElement("div")
    this._element.className = "gv-map"
    const style = this._element.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"
    style.zIndex = "0"

    const container = map.viewPort
    container.insertBefore(this._element, container.firstChild || null)
  }

  renderFrame(frameState) {
    const { zoomLevel, projection } = frameState.viewState

    const layers = this.map.layers

    const mapElements = []
    let previousElement = null

    const visibleLayers = layers.filter((layer) => {
      return zoomLevel > (layer.minZoom || 0)
    })

    const renderLayer = (layer, declutterTree) => {
      const viewState = frameState.viewState
      // set layer projection if applicable
      if (layer.projection) {
        viewState.projection = layer.projection
      }

      const element = layer.renderFrame({ ...frameState, viewState, declutterTree }, previousElement)
      if (element !== previousElement) {
        mapElements.push(element)
        previousElement = element
      }

      // reset to map projection
      viewState.projection = projection
    }

    const baseLayers = visibleLayers.filter((layer) => !layer.declutter)
    for (const layer of baseLayers) {
      renderLayer(layer)
    }

    const declutterTree = new RBush()

    const layersToDeclutter = [...visibleLayers].filter((layer) => !!layer.declutter).reverse()
    for (const layer of layersToDeclutter) {
      renderLayer(layer, declutterTree)
    }

    replaceChildren(this._element, mapElements)
  }
}
