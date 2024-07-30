import { zoom, zoomIdentity } from "d3-zoom"
import { useState, useMemo, useCallback } from "preact/hooks"
import "d3-transition"

export function useZoom({ enabled, minZoom, maxZoom, extent }) {
  const [transform, setTransform] = useState(zoomIdentity)

  const zoomBehaviour = useMemo(() => {
    if (!enabled) return null

    const zoomBehaviour = zoom()
      .scaleExtent([minZoom, maxZoom])
      .extent(extent)
      .on("zoom", (event) => {
        setTransform(event.transform)
      })

    return zoomBehaviour
  }, [enabled, minZoom, maxZoom, extent])

  const fitBounds = useCallback(
    (bounds, mapSize) => {
      if (!zoomBehaviour) return
      let newTransform = zoomIdentity

      const [[x0, y0], [x1, y1]] = bounds
      const { width, height } = mapSize

      newTransform = newTransform
        .translate(width / 2, height / 2)
        .scale(
          Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)),
        )
        .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)

      setTransform(newTransform)
    },
    [zoomBehaviour],
  )

  return { zoomBehaviour, transform, fitBounds }
}
