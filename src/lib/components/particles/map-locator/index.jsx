export const MapLocator = ({ path, projection, features, markerCoordinates, width, height, markerColor, backgroundColor='#707070', markerRadius=15 }) =>
  <svg
    viewBox={`0 0 ${width} ${height}`}
    preserveAspectRatio={"xMinYMin"}>
    <g>
      {
        features.map((f, i) => {
          return (
            <path
              fill={backgroundColor}
              key={i}
              d={path(f)}
            />
          )
        })
      }
    </g>
    <g>
      <circle
        cx={projection(markerCoordinates)[0]}
        cy={projection(markerCoordinates)[1]}
        r={markerRadius}
        fill={markerColor}
      />
    </g>
  </svg>
