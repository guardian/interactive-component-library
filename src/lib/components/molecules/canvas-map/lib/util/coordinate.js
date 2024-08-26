/** @typedef {[number, number] | {lng: number, lat: number}} GeoCoordinateLike */

/**
 * A `GeoCoordinate` object represents a given longitude and latitude coordinate, measured in degrees.
 * These coordinates are based on the [WGS84 (EPSG:4326) standard](https://en.wikipedia.org/wiki/World_Geodetic_System#WGS84).
 *
 * @class
 */
export class GeoCoordinate {
  constructor(longitude, latitude) {
    if (isNaN(longitude) || isNaN(latitude)) {
      throw new Error(`Invalid GeoCoordinate: (${longitude}, ${latitude})`)
    }

    this.lng = longitude
    this.lat = latitude
  }

  /**
   * Converts an array of two numbers or an object with `lng` and `lat` properties
   * to a `GeoCoordinate` object.
   *
   * If a `GeoCoordinate` object is passed in, the function returns it unchanged.
   *
   * @param {GeoCoordinateLike} input - An array of two numbers ([lng<number>, lat<number>]), a  {lng: number, lat: number} object, or an instance of `GeoCoordinate`.
   * @returns {GeoCoordinate} A new `GeoCoordinate` object, if a conversion occurred, or the original `GeoCoordinate` object.
   */
  static convert(input) {
    if (input instanceof GeoCoordinate) {
      return input
    }
    if (Array.isArray(input) && (input.length === 2 || input.length === 3)) {
      return new GeoCoordinate(Number(input[0]), Number(input[1]))
    }
    if (!Array.isArray(input) && typeof input === "object" && input !== null) {
      return new GeoCoordinate(Number(input.lng), Number(input.lat))
    }
    throw new Error(
      "`input` argument must be specified as an object {lng: <lng>, lat: <lat>} or an array [lng<number>, lat<number>]",
    )
  }
}
