import proj4d3 from 'proj4d3'
import { geoPath } from 'd3-geo'

export const MapLocator = ({ proj4String, featureCollection, markerCoordinates, width, height, markerColor }) => {
  const proj = proj4d3(proj4String).fitSize([width, height], featureCollection)
  const path = geoPath().projection(proj)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={"xMinYMin"}>
      <g>
        {
          featureCollection.features.map((f, i) => {
            return (
              <path
                key={i}
                d={path(f)}
                id={f.id}
              />
            )
          })
        }
      </g>
      <g>
        <circle
          cx={proj(markerCoordinates)[0]}
          cy={proj(markerCoordinates)[1]}
          r={5}
          fill={markerColor}
        />
      </g>
    </svg>
  )
}
