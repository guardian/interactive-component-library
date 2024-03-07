import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const MapLocator = ({ path, projection, features, size, marker, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <svg
      class={styles.svg}
      viewBox={`0 0 ${size.width} ${size.height}`}
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
          cx={projection(marker.coordinates)[0]}
          cy={projection(marker.coordinates)[1]}
          r={marker.radius}
          class={styles.circle}
        />
      </g>
    </svg>
  )
}