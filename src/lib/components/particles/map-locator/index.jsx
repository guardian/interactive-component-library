import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const MapLocator = ({ svgPath, size, marker, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <svg
      class={styles.svg}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio={"xMinYMin"}>
      <image width={size.width} height={size.height} href={svgPath} />
      <g>
        <circle
          cx={marker.cx}
          cy={marker.cy}
          r={marker.radius}
          class={styles.circle}
        />
      </g>
    </svg>
  )
}