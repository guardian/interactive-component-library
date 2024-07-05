// Assuming base resolution is 156543.03392 meters per pixel at zoom level 0 (common for Web Mercator projection)
const BASE_RESOLUTION = 156543.03392

export function zoomLevelToZoomScale(zoomLevel, initialResolution) {
  // Calculate the resolution at the given zoom level
  const resolution = BASE_RESOLUTION / Math.pow(2, zoomLevel)

  // Calculate the zoom scale from the initial resolution
  const zoomScale = initialResolution / resolution
  return zoomScale
}

export function zoomLevelForResolution(currentResolution) {
  const zoomLevel = Math.log2(BASE_RESOLUTION / currentResolution)
  return zoomLevel
}
