import { createContext } from "preact"

/**
 * @type {import('preact').Context<{ map: import('../lib/Map').Map | null }>}
 */
export const MapContext = createContext(null)

/**
 * @param {Object} params
 * @param {import('../lib/Map').Map} params.map
 * @param {import('preact').ComponentChildren} params.children
 */
export function MapProvider({ map, children }) {
  return <MapContext.Provider value={{ map }}>{children}</MapContext.Provider>
}
