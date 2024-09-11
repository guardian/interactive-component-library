import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

/**
 * @typedef {Object} CircleIconProps
 * @property {string} color
 * @property {boolean} [pulse]
 * @property {number} [diameter=11]
 * @property {string} [splitColor]
 * @property {Object} [styles]
 */
export const CircleIcon = ({
  color,
  pulse = false,
  diameter = 11,
  styles,
  splitColor,
}) => {
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
      {splitColor && (
        <path
          d={`M ${radius + padding / 2} ${padding / 2} A ${radius} ${radius} 0 0 1 ${radius + padding / 2} ${diameter + padding / 2} L ${radius + padding / 2} ${radius + padding / 2} Z`}
          fill={splitColor}
          transform={`rotate(45 ${radius + padding / 2} ${radius + padding / 2})`}
        />
      )}
    </svg>
  )
}
