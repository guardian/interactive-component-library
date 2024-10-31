import { haversineDistance } from "./distance"

/**
 * Get map resolution
 *
 * @param {import("./bounds").GeoBounds} bounds
 * @param {[Number, Number]} viewportSize
 * @return {number} Map resolution (horizontal)
 * @api
 */
export function resolutionForBounds(bounds, viewportSize) {
  const { southWest, northEast } = bounds

  // Calculate the distance in meters between the longitude bounds (lonMin, latMid) and (lonMax, latMid)
  const latMid = (southWest.lat + northEast.lat) / 2
  const distance = haversineDistance(
    latMid,
    southWest.lng,
    latMid,
    northEast.lng,
  )

  // Calculate the initial resolution in meters per pixel (or point really)
  const resolution = distance / viewportSize[0]

  return resolution
}
