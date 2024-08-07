import { useEffect } from "preact/hooks"
import { toChildArray } from "preact"

import * as MapLayers from "../layers"
const layerTypes = Object.values(MapLayers)

/**
 * Throws an error if any child component in `children` is not a valid layer (Polygon, Line, etc)
 */
export function useThrowIfNonLayerChildren(children) {
  useEffect(() => {
    const firstNonLayerChild = toChildArray(children).find(
      (child) => !layerTypes.includes(child.type),
    )

    if (firstNonLayerChild) {
      throw Error(
        `unknown component type passed as child to SVGMap component: ${firstNonLayerChild.type}`,
      )
    }
  }, [children])
}
