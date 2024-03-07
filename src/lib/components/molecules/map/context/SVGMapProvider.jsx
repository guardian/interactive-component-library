import { useMemo } from 'preact/hooks'
import { geoPath } from 'd3-geo'
import { bboxFeature } from '../helpers/bboxFeature'
import { MapContext } from './MapContext'

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

  const context = {
    id,
    mapRef,
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
  }
  return <MapContext.Provider value={context}>{children}</MapContext.Provider>
}
