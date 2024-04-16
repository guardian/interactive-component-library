import { useMemo, useState, useCallback } from 'preact/hooks'
import { geoPath } from 'd3-geo'
import { bboxFeature } from '../helpers/bboxFeature'
import { MapContext } from './MapContext'
import { calculateScale } from '../helpers/geoMath'

export function SVGMapProvider({ id, mapRef, width, height, padding, config, zoom, selectedFeature, children }) {
  const contentSize = useMemo(
    () => ({
      width: width - padding.left - padding.right,
      height: height - padding.top - padding.bottom,
    }),
    [width, height, padding],
  )

  const projection = useMemo(() => {
    return config.projection.fitSize([contentSize.width, contentSize.height], bboxFeature(config.bounds))
  }, [contentSize, config])

  const path = geoPath().projection(projection)

  const [layerSet, setLayers] = useState(new Set())

  const findFeatureAtPoint = useCallback(
    ({ x, y }) => {
      const adjustedPoint = [x - padding.left, y - padding.top]
      for (const layer of layerSet) {
        if (typeof layer.findFeatureAtPoint === 'function') {
          const feature = layer.findFeatureAtPoint(adjustedPoint)
          if (feature) return feature
        }
      }
      return null
    },
    [padding, layerSet],
  )

  const getVisibleBounds = useCallback(() => {
    const projectedSW = projection.invert([padding.left, contentSize.height])
    const projectedNE = projection.invert([padding.left + contentSize.width, padding.top])
    return [projectedSW, projectedNE]
  }, [projection, contentSize, padding])

  const getZoomScale = useCallback(() => {
    return calculateScale(getVisibleBounds(), contentSize.width, contentSize.height)
  }, [getVisibleBounds, contentSize])

  const context = {
    id,
    projection,
    config,
    path,
    size: { width, height },
    contentSize,
    padding,
    zoom,
    extent: [
      [0, 0],
      [width, height],
    ],
    selectedFeature,
    getZoomScale,
    registerLayer(layer) {
      setLayers((current) => {
        current.add(layer)
        return current
      })
    },
    unregisterLayer(layer) {
      setLayers((current) => {
        current.delete(layer)
        return current
      })
    },
    findFeatureAtPoint,
  }

  mapRef.current = context

  return <MapContext.Provider value={context}>{children}</MapContext.Provider>
}
