import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const MapLocator = ({ path, projection, features, markerCoordinates, width, height, markerRadius=15, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <svg
      class={styles.svg}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={"xMinYMin"}>
      <g>
        {
          features.map((f, i) =>
            <path
              class={styles.path}
              key={i}
              d={path(f)}
            />
          )
        }
      </g>
      <g>
        <circle
          cx={projection(markerCoordinates)[0]}
          cy={projection(markerCoordinates)[1]}
          r={markerRadius}
          class={styles.circle}
        />
      </g>
    </svg>
  )
}