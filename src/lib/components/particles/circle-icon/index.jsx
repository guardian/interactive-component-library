import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const CircleIcon = ({ color, pulse = false, diameter = 11, styles }) => {
  styles = mergeStyles(defaultStyles, styles)

  let radius = diameter / 2
  let padding = 2

  return (
    <svg
      style={styles.svg}
      fill="none"
      height={diameter + padding}
      viewBox={`0 0 ${diameter + padding} ${diameter + padding}`}
      width={diameter + padding}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={[styles.circle, pulse && styles.pulse].join(" ")}
        style={{ fill: color }}
        r={radius}
        cx={radius + padding / 2}
        cy={radius + padding / 2}
      />
    </svg>
  )
}
