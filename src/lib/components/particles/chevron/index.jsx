import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

const DIRECTION = {
  up: "up",
  down: "down",
}

const SIZE = {
  small: "small",
  large: "large",
}

export function Chevron({
  active = false,
  direction = DIRECTION.down,
  size = SIZE.small,
  styles,
}) {
  const defaultStylesCopy = { ...defaultStyles }

  if (active) {
    defaultStylesCopy.path = mergeStyles(
      defaultStyles.path,
      defaultStyles.active,
    )
  }

  if (direction === DIRECTION.up) {
    defaultStylesCopy.group = mergeStyles(
      defaultStyles.group,
      defaultStyles.rotated,
    )
  }

  styles = mergeStyles(defaultStylesCopy, styles)

  return size === SIZE.small ? (
    <SmallChevron styles={styles} />
  ) : (
    <LargeChevron styles={styles} />
  )
}

function SmallChevron({ styles }) {
  return (
    <svg
      width="16"
      height="24"
      viewBox="0 0 16 24"
      className={styles.svg}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={styles.group} style="transform-box: fill-box;">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.80569 10.7123L11.6344 15H12.365L16.1938 10.7123L15.4997 10L11.9997 13L8.49976 10L7.80569 10.7123Z"
          className={styles.path}
        />
      </g>
    </svg>
  )
}

function LargeChevron({ styles }) {
  return (
    <svg
      width="15"
      height="19"
      className={styles.svg}
      viewBox="0 0 15 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={styles.group}>
        <path
          d="M0.667809 7.5L6.81507 12.1053L8.18493 12.1053L14.3322 7.5L15 8.09868L7.84247 14.5L7.15753 14.5L-2.61693e-08 8.09868L0.667809 7.5Z"
          className={styles.path}
        />
      </g>
    </svg>
  )
}
