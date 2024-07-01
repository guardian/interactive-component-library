import { haversineDistance } from "./distance"

/**
 * Get map resolution
 *
 * @param {Extent} extent Geographical extent: [ lonMin, latMin, lonMax, latMax ]
 * @param {size} viewportSize Viewport size: [ width, height ]
 * @return {number} Map resolution (horizontal)
 * @api
 */
export function resolutionForExtent(extent, viewportSize) {
  const [lonMin, latMin, lonMax, latMax] = extent

  // Calculate the distance in meters between the longitude bounds (lonMin, latMid) and (lonMax, latMid)
  const latMid = (latMin + latMax) / 2
  const distance = haversineDistance(latMid, lonMin, latMid, lonMax)

  // Calculate the initial resolution in meters per pixel (or point really)
  const resolution = distance / viewportSize[0]

  return resolution
}
