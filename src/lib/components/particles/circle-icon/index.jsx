import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const CircleIcon = ({ color, pulse = false, styles }) => {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <svg
      style={styles.svg}
      fill="none"
      height="11"
      viewBox="0 0 11 11"
      width="11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className={[styles.circle, pulse && styles.pulse].join(" ")}
        style={{ fill: color }}
        height="11"
        rx="5.5"
        width="11"
      />
    </svg>
  )
}
