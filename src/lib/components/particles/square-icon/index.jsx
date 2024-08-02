import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.scss"

export const SquareIcon = ({ color, size, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <svg
      width={size}
      height={size}
      className={styles.svg}
      viewBox={`0 0 ${size} ${size}`}
    >
      <rect
        id="square"
        fill={color}
        className={styles.squareFill}
        width={size}
        height={size}
      />
    </svg>
  )
}
