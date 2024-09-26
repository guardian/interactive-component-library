import { createContext } from "preact"
import { useEffect, useState } from "preact/hooks"

/**
 * @import { Layer } from "../lib/layers"
 * @import { ReactNode } from "preact/compat"
 */

/**
 * @typedef {{
 *   registerLayer: ((layer: Layer, comp: ReactNode) => void) | null,
 *   unregisterLayer: ((layer: Layer) => void) | null
 * }} MapContext
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
  const [layers, setLayers] = useState([])

  const registerLayer = (layer, comp) => {
    if (!layers.includes(layer)) {
      const position = getCompTreePosition(comp, children)

      if (position === null) {
        console.warn(`failed to find target component in component tree`, comp)
        return
      }

      setLayers((prevLayers) => {
        // Insert the new layer at the correct position in the layers list
        const newLayers = [...prevLayers]
        newLayers.splice(position, 0, layer)
        return newLayers
      })
    }
  }

  const unregisterLayer = (layerToRemove) => {
    setLayers((prevLayers) =>
      prevLayers.filter((layer) => layer !== layerToRemove),
    )
  }

  useEffect(() => {
    if (!map) return
    map.setLayers(layers)
  }, [map, layers])

  return (
    <MapContext.Provider value={{ registerLayer, unregisterLayer }}>
      {children}
    </MapContext.Provider>
  )
}

/**
 * Given a React component's children, find the in-order position of the target component in the
 * component tree.
 *
 * Eg., for the following component tree, getCompTreePosition(C, A.children) will return 4:
 *
 *      A
 *     / \
 *    B   C
 *   / \
 *  D   E
 *
 * @param {import('preact/compat').ReactNode} targetComponent
 * @param {import('preact').ComponentChildren} children
 */
function getCompTreePosition(targetComponent, children, debug = false) {
  let index = 0

  let debugComponentPath = []

  function traverse(nodes) {
    for (const node of nodes) {
      if (!node) continue

      // Preact mangles property names, read as: node.component.vnode.children
      const childNodes = node.__c?.__v?.__k

      // If debug, keep track of the current search path
      if (debug) {
        let name =
          node.__c?.constructor.displayName || node.__c?.constructor.name

        if (name === "m") {
          // "m" means Fragment, so store as "", so it'll be printed as </>
          name = ""
        }

        debugComponentPath.push(name)
      }

      if (childNodes && childNodes.length > 0) {
        // If node has children, traverse them. Nodes with no children have a .__k property of "[null]".
        const result = traverse(childNodes)

        if (result !== null) {
          return result
        }
      }

      // This __c property of a ReactNode returns the instance that's given by "this" in the component constructor
      if (node?.__c === targetComponent) {
        return index
      }

      if (debug) {
        debugComponentPath.pop()
      }

      index++
    }

    return null
  }

  const result = traverse(Array.isArray(children) ? children : [children])

  if (debug && result) {
    // eslint-disable-next-line no-console
    console.log(`<${debugComponentPath.join("/> → <")}/>`)
  }

  return result
}
