// bounds in [[SW lon, SW lat], [NE lon], [NE lat]] format
// e.g. UK bounding box: [[-8.642194417322951, 49.88234469492934], [1.7683086664999994, 60.8456995072]]
// Note the reverse winding order of coordinates. This is essential in D3 https://stackoverflow.com/questions/49311001/d3-js-drawing-geojson-incorrectly

export function bboxFeature(bounds) {
  const minLon = bounds[0][0]
  const minLat = bounds[0][1]
  const maxLon = bounds[1][0]
  const maxLat = bounds[1][1]

  const feature = {
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [
        [
          [minLon, maxLat],
          [maxLon, maxLat],
          [maxLon, minLat],
          [minLon, minLat],
          [minLon, maxLat],
        ],
      ],
      type: "Polygon",
    },
  }

  return feature
}
