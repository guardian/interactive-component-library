import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const MapLocator = ({ basemapImage, size, marker, styles, projection, abbreviation }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)
  const projectedCoords = projection(marker.coordinates)
  
  return (
    <svg
      class={styles.svg}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio={"xMinYMin"}>
      <image width={size.width} height={size.height} href={basemapImage} />
      <g>
        <circle
          cx={projectedCoords[0]}
          cy={projectedCoords[1]}
          r={marker.radius}
          class={`${styles.circle} fill-color--${abbreviation}`}
        />
      </g>
    </svg>
  )
}