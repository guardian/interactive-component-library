import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const CircleIcon = ({ color, pulse = false, diameter = 11, styles }) => {
  styles = mergeStyles(defaultStyles, styles)

  let radius = diameter / 2

  return (
    <svg
      style={styles.svg}
      fill="none"
      height={diameter + 1}
      viewBox={`0 0 ${diameter + 2} ${diameter + 2}`}
      width={diameter + 1}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={[styles.circle, pulse && styles.pulse].join(" ")}
        style={{ fill: color }}
        r={radius}
        cx={radius + 1}
        cy={radius + 1}
      />
    </svg>
  )
}
