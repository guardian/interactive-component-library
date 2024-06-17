import { useMemo, useRef, useCallback } from "preact/hooks"
import { bboxFeature } from "../helpers/bboxFeature"
import { MapContext } from "./MapContext"

export function CanvasMapProvider({ id, mapRef, width, height, padding, config, zoom, selectedFeature, children }) {
  const pixelRatio = window?.devicePixelRatio || 1
  const sizeInPixels = multipliedBy({ width, height }, pixelRatio)
  const paddingInPixels = multipliedBy(padding, pixelRatio)

  const contentSize = useMemo(
    () => ({
      width: sizeInPixels.width - paddingInPixels.left - paddingInPixels.right,
      height: sizeInPixels.height - paddingInPixels.top - paddingInPixels.bottom,
    }),
    [sizeInPixels, paddingInPixels],
  )

  const mapExtent = useMemo(() => {
    return [
      [paddingInPixels.left, paddingInPixels.top],
      [contentSize.width, contentSize.height],
    ]
  }, [paddingInPixels, contentSize])

  const projection = useMemo(() => {
    const projection = config.projection.fitExtent(mapExtent, bboxFeature(config.bounds))
    return projection
  }, [mapExtent, config])

  const layerSet = useRef(new Set())
  const layers = useRef([])

  const updateLayers = useCallback((layerSet) => {
    const _layers = Array.from(layerSet.current)
    // sort layers in reverse order (top layer first)
    _layers.sort((a, b) => {
      return b.zIndex - a.zIndex
    })
    layers.current = _layers
  }, [])

  const registerLayer = useCallback(
    (layer) => {
      layerSet.current.add(layer)
      updateLayers(layerSet)
    },
    [updateLayers],
  )

  const unregisterLayer = useCallback(
    (layer) => {
      layerSet.current.delete(layer)
      updateLayers(layerSet)
    },
    [updateLayers],
  )

  const findFeatureAtPoint = useCallback(
    ([x, y]) => {
      const topLayer = layers.current && layers.current[0]
      if (topLayer && typeof topLayer.findFeatureAtPoint === "function") {
        const feature = topLayer.findFeatureAtPoint([x, y])
        if (feature) return feature
      }
      return null
    },
    [paddingInPixels],
  )

  const context = {
    id,
    mapRef,
    projection,
    config,
    pixelRatio,
    size: { width, height },
    sizeInPixels,
    contentSize,
    zoom: {
      ...zoom,
      extent: [
        [0, 0],
        [sizeInPixels.width, sizeInPixels.height],
      ],
    },
    extent: mapExtent,
    selectedFeature,
    findFeatureAtPoint,
    registerLayer,
    unregisterLayer,
  }

  mapRef.current = context

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>
}

function multipliedBy(object, factor) {
  return Object.keys(object).reduce((acc, key) => {
    acc[key] = object[key] * factor
    return acc
  }, {})
}
