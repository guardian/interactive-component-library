import { geoAlbers, geoMercator, geoIdentity, geoAlbersUsa } from "d3-geo"
import { geoAlbersUk } from "d3-composite-projections"

/** @typedef {(point: [number, number]) => [number, number] | null} ProjectionFunction */

/**
 * Projection functions for different map projections.
 * @readonly
 * @enum {ProjectionFunction}
 */
export const Projection = {
  geoIdentity: geoIdentity(),
  geoMercator: geoMercator(),
  geoAlbersUS: geoAlbersUsa().scale(1070).translate([487.5, 305]),
  geoAlbersUKComposite: geoAlbersUk(),
  geoAlbersEngland: geoAlbers()
    .center([0, 52.7])
    .rotate([1.1743, 0])
    .parallels([50, 54]),
}
