import { Extent } from "."

/**
 * Function to create a GeoJSON feature from a GeoBoundsLike object.
 * @function
 * @param {import("./extent").ExtentLike} extent
 * @returns {import("../formats/GeoJSON").GeoJSONFeature} A GeoJSON feature representing a rectangle for the given bounds.
 * @note The reverse winding order of coordinates. This is essential in D3 https://stackoverflow.com/questions/49311001/d3-js-drawing-geojson-incorrectly
 */
export function bboxFeature(extent) {
  const { minX, minY, maxX, maxY } = Extent.convert(extent)

  const feature = {
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [
        [
          [minX, minY],
          [minX, maxY],
          [maxX, maxY],
          [maxX, minY],
          [minX, minY],
        ],
      ],
      type: "Polygon",
    },
  }

  return feature
}
