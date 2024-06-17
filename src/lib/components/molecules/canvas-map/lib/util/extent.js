export function extentForCoordinates(coordinates) {
  let minX = Infinity,
    minY = Infinity
  let maxX = -Infinity,
    maxY = -Infinity

  for (const coordinate of coordinates) {
    if (coordinate[0] < minX) {
      minX = coordinate[0]
    }
    if (coordinate[0] > maxX) {
      maxX = coordinate[0]
    }
    if (coordinate[1] < minY) {
      minY = coordinate[1]
    }
    if (coordinate[1] > maxY) {
      maxY = coordinate[1]
    }
  }

  return [minX, minY, maxX, maxY]
}

export function combineExtents(extent1, extent2) {
  const minX = Math.min(extent1[0], extent2[0])
  const minY = Math.min(extent1[1], extent2[1])
  const maxX = Math.max(extent1[2], extent2[2])
  const maxY = Math.max(extent1[3], extent2[3])
  return [minX, minY, maxX, maxY]
}

/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */

export function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1])
}

/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */
export function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3]
}
