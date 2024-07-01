/**
 * Get map resolution
 *
 * @param {Extent} extent Geographical extent: [ lonMin, latMin, lonMax, latMax ]
 * @param {size} viewportSize Viewport size: [ width, height ]
 * @return {number} Map resolution
 * @api
 */
export function resolutionForExtent(extent, viewportSize) {
  const [lonMin, latMin, lonMax, latMax] = extent
  const width = Math.abs(lonMax - lonMin)
  const height = Math.abs(latMax - latMin)
  const resolutionX = width / viewportSize[0]
  const resolutionY = height / viewportSize[1]
  return Math.max(resolutionX, resolutionY)
}
