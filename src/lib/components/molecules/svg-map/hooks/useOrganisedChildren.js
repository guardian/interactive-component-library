import { useMemo } from "preact/hooks"
import { toChildArray } from "preact"
import * as MapLayers from "../layers"
import * as Controls from "../controls"

const layerTypes = Object.values(MapLayers)
const controlTypes = Object.values(Controls)

export function useOrganisedChildren(children) {
  const organisedChildren = useMemo(() => {
    // separate map layers from controls
    return toChildArray(children).reduce(
      (output, current) => {
        if (layerTypes.includes(current.type)) {
          output.layers.push(current)
        } else if (controlTypes.includes(current.type)) {
          output.controls[current.type.name] = current
        } else {
          throw Error(`Unknown component type passed as child to Map component: ${current.type}`)
        }

        return output
      },
      { controls: {}, layers: [] },
    )
  }, [children])

  return organisedChildren
}
