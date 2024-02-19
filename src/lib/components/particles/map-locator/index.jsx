import proj4d3 from 'proj4d3'
import { geoPath } from 'd3-geo'

export const MapLocator = ({ proj4String, featureCollection, markerCoordinates, width, height, markerColor, backgroundColor='#707070' }) => {
  const proj = proj4d3(proj4String).fitSize([width, height], featureCollection)
  const path = geoPath().projection(proj)
  const projectedCoordinates = proj(markerCoordinates)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={"xMinYMin"}>
      <g>
        {
          featureCollection.features.map((f, i) => {
            return (
              <path
                fill={backgroundColor}
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
          cx={projectedCoordinates[0]}
          cy={projectedCoordinates[1]}
          r={15}
          fill={markerColor}
        />
      </g>
    </svg>
  )
}
