import { GeoBounds } from "./bounds"

/**
 * Function to create a GeoJSON feature from a GeoBoundsLike object.
 * @function
 * @param {import("./bounds").GeoBoundsLike} bounds
 * @returns {import("../formats/GeoJSON").GeoJSONFeature} A GeoJSON feature representing a rectangle for the given bounds.
 * @note The reverse winding order of coordinates. This is essential in D3 https://stackoverflow.com/questions/49311001/d3-js-drawing-geojson-incorrectly
 */
export function bboxFeature(bounds) {
  const geoBounds = GeoBounds.convert(bounds)
  const [minLon, minLat, maxLon, maxLat] = geoBounds.flat()

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
