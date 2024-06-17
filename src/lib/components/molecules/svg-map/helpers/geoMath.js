export function calculateScale(mapBounds, mapWidthPixels, mapHeightPixels) {
  const south = mapBounds[0][1]
  const west = mapBounds[0][0]
  const north = mapBounds[1][1]
  const east = mapBounds[1][0]

  const widthKilometers = distanceInKmBetweenEarthCoordinates([west, south], [east, south])
  const heightKilometers = distanceInKmBetweenEarthCoordinates([west, south], [west, north])

  const scaleX = mapWidthPixels / widthKilometers
  const scaleY = mapHeightPixels / heightKilometers

  const scale = (scaleX + scaleY) / 2

  return scale
}

export function circleContainsCoordinates(circleCoordinates, radius, coordinates) {
  const realWorldDistance = distanceInKmBetweenEarthCoordinates(circleCoordinates, coordinates)
  return realWorldDistance <= radius
}

// from: https://stackoverflow.com/questions/59633860/check-if-point-is-inside-circle
export function distanceInKmBetweenEarthCoordinates(point1, point2) {
  let [lon1, lat1] = point1
  let [lon2, lat2] = point2

  const earthRadiusKm = 6371

  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)

  lat1 = degreesToRadians(lat1)
  lat2 = degreesToRadians(lat2)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}

export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180
}
