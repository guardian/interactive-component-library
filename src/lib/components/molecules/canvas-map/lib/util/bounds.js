import { GeoCoordinate } from "./coordinate"
import { Extent } from "./extent"

/**
 * @typedef {import("./coordinate").GeoCoordinateLike} Coordinate
 * @typedef {[number, number, number, number] | [Coordinate, Coordinate] | {sw: Coordinate, ne: Coordinate}} GeoBoundsLike
 */

/**
 * A GeoBounds object represents a geographical bounding box, defined by its southwest and northeast points in longitude and latitude.
 *
 * @property {GeoCoordinate} southWest
 * @property {GeoCoordinate} northEast
 */
export class GeoBounds {
  /**
   * @constructor
   * @param {Object} bounds
   * @param {GeoCoordinate} bounds.southWest
   * @param {GeoCoordinate} bounds.northEast
   */
  constructor({ southWest, northEast }) {
    this.southWest = southWest
    this.northEast = northEast
  }

  /**
   * @returns {[number, number, number, number]}
   */
  flat() {
    return [
      this.southWest.lng,
      this.southWest.lat,
      this.northEast.lng,
      this.northEast.lat,
    ]
  }

  toExtent() {
    const southWestLatitude = this.southWest.lat
    const northEastLatitude = this.northEast.lat
    const flippedY = southWestLatitude < northEastLatitude
    if (flippedY) {
      return new Extent(
        this.southWest.lng,
        this.southWest.lat,
        this.northEast.lng,
        this.northEast.lat,
      )
    } else {
      return new Extent(
        this.southWest.lng,
        this.northEast.lat,
        this.northEast.lng,
        this.southWest.lat,
      )
    }
  }

  /**
   * Converts an array to a `GeoBounds` object.
   *
   * If a `GeoBounds` object is passed in, the function returns it unchanged.
   *
   * Internally, the function calls `GeoCoordinate#convert` to convert arrays to `GeoCoordinate` values.
   *
   * @param {GeoBoundsLike} input - An array of two coordinates to convert
   * @returns {GeoBounds | null} A new `GeoBounds` object, if a conversion occurred, or the original `GeoBounds` object.
   */
  static convert(input) {
    if (input instanceof GeoBounds) return input
    if (!input) return null

    if (Array.isArray(input)) {
      const [sw, ne] = input.map((d) => GeoCoordinate.convert(d))
      return new GeoBounds({ southWest: sw, northEast: ne })
    } else if (typeof input === "object" && input !== null) {
      const { sw, ne } = input
      return new GeoBounds({
        southWest: GeoCoordinate.convert(sw),
        northEast: GeoCoordinate.convert(ne),
      })
    }

    throw new Error("`input` argument must be of type `GeoBoundsLike`")
  }
}
