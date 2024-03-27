import { useMemo } from 'preact/hooks'
import { bboxFeature } from '../helpers/bboxFeature'
import { MapContext } from './MapContext'

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
  }
  return <MapContext.Provider value={context}>{children}</MapContext.Provider>
}

function multipliedBy(object, factor) {
  return Object.keys(object).reduce((acc, key) => {
    acc[key] = object[key] * factor
    return acc
  }, {})
}
