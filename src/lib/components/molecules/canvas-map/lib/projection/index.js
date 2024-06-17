import { geoAlbers, geoMercator } from "d3-geo"
import { geoAlbersUk } from "d3-composite-projections"

export const Projection = {
  geoAlbersUKComposite: geoAlbersUk(),
  geoAlbersEngland: geoAlbers().center([0, 52.7]).rotate([1.1743, 0]).parallels([50, 54]),
  geoMercator: geoMercator(),
}
