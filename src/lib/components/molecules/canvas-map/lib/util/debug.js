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

export function generateDebugUrl(feature) {
  // Example: http://geojson.io/#data=data:application/json,%7B%22type%22%3A%22LineString%22%2C%22coordinates%22%3A%5B%5B0%2C0%5D%2C%5B10%2C10%5D%5D%7D

  const geojson = {
    type: "FeatureCollection",
    features: [feature],
  }
  // console.log(geojson);
  const jsonString = encodeURIComponent(JSON.stringify(geojson))
  return `https://geojson.io/#data=data:application/json,${jsonString}`
}
