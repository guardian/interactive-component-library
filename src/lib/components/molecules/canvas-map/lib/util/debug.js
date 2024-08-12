/**
 * @function
 * @param {Array<import('../geometry').Geometry>} geometries
 */
export function validateGeometries(geometries) {
  if (!Array.isArray(geometries)) {
    throw new Error("geometries must be an array")
  }
  geometries.forEach((geometry) => {
    if (!geometry.type) {
      throw new Error("geometry must have a type")
    }
    if (!geometry.coordinates?.length) {
      throw new Error("geometry must have coordinates")
    }
  })
}

/**
 *
 * @param {import('../Feature').Feature | Object} feature - The feature you want to inspect
 * @returns {string} URL to geojson.io, with feature embedded
 */
export function generateDebugUrl(feature, convertToGeoJSON = true) {
  // Example: http://geojson.io/#data=data:application/json,%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B0%2C0%5D%2C%5B10%2C10%5D%5D%7D

  const featureGeoJSON = convertToGeoJSON ? feature.getGeoJSON() : feature

  const featureCollection = {
    type: "FeatureCollection",
    features: [featureGeoJSON],
  }

  const jsonString = encodeURIComponent(JSON.stringify(featureCollection))
  return `https://geojson.io/#data=data:application/json,${jsonString}`
}
