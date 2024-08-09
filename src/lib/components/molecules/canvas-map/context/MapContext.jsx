import { createContext } from "preact"
import { useEffect } from "preact/hooks"

/**
 * @typedef {{ registerLayer: ((layer: import("../lib/layers").Layer) => void) | null }} MapContext
 */

/**
 * @type {import('preact').Context<MapContext | null>}
 */
export const MapContext = createContext(null)

/**
 * @param {Object} params
 * @param {import('../lib/Map').Map} params.map
 * @param {import('preact').ComponentChildren} params.children
 */
export function MapProvider({ map, children }) {
  const registeredLayers = []

  // This function is called by child layers to register themselves with the map, every time a layer
  // is rendered
  const registerLayer = (layer) => {
    registeredLayers.push(layer)
  }

  // If the registered layers for this render don't match the layers in the map, then reset the
  // map layers to the new set. If the map's layers perfectly match this render's layers, then
  // there were no changes to the set and order of layers passed as children to Map.
  useEffect(() => {
    if (map && !map.hasLayers(registeredLayers)) {
      map.setLayers(registeredLayers)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, children])

  return (
    <MapContext.Provider value={{ registerLayer }}>
      {children}
    </MapContext.Provider>
  )
}
