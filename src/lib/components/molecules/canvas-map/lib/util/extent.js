/**
 * @typedef {[number, number, number, number] | [[number, number], [number, number]] |  {minX: number, minY: number, maxX: number, maxY: number}} ExtentLike
 */

/**
 * @class Extent
 * @property {number} minX The minimum x value of the extent.
 * @property {number} minY The minimum y value of the extent.
 * @property {number} maxX The maximum x value of the extent.
 * @property {number} maxY The maximum y value of the extent.
 * @property {ExtentLike} array The extent as an array of numbers.
 *
 * @example
 * // The extent of a 975x610 viewport
 * const viewPortExtent = new Extent([0, 0, 975, 610])
 */
export class Extent {
  constructor(minX, minY, maxX, maxY) {
    this.minX = minX
    this.minY = minY
    this.maxX = maxX
    this.maxY = maxY
  }

  flat() {
    return [this.minX, this.minY, this.maxX, this.maxY]
  }

  /**
   * Converts {@link ExtentLike} to an {@link Extent} object.
   *
   * If an {@link Extent} object is passed in, the function returns it unchanged.
   *
   *
   * @param {ExtentLike} input - Extent defined as {@link ExtentLike}.
   * @returns A new `Extent` object, if a conversion occurred, or the original `Extent` object.
   */
  static convert(input) {
    if (input instanceof Extent) return input
    if (!input) return input

    if (Array.isArray(input) && input.length === 4) {
      const [minX, minY, maxX, maxY] = input
      return new Extent(minX, minY, maxX, maxY)
    } else if (Array.isArray(input) && input.length === 2) {
      const [min, max] = input
      return new Extent(min[0], min[1], max[0], max[1])
    } else if (typeof input === "object" && input !== null) {
      const { minX, minY, maxX, maxY } = input
      return new Extent(minX, minY, maxX, maxY)
    }

    throw new Error("`input` argument must be of type `ExtentLike`")
  }
}

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
 * @param {import("./coordinate").GeoCoordinateLike} coordinate Coordinate.
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
