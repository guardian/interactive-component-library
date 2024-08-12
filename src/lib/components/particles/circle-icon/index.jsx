import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const CircleIcon = ({ color, pulse = false, diameter = 11, styles }) => {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <svg
      style={styles.svg}
      fill="none"
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      width={diameter}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={[styles.circle, pulse && styles.pulse].join(" ")}
        style={{ fill: color }}
        r={diameter / 2}
        cx={diameter / 2}
        cy={diameter / 2}
      />
    </svg>
  )
}
