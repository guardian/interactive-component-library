import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

const DIRECTION = {
  up: 'up',
  down: 'down',
}

export function Chevron({ active = false, direction = DIRECTION.down, styles }) {
  const defaultStylesCopy = { ...defaultStyles }

  if (active) {
    defaultStylesCopy.path = mergeStyles(defaultStyles.path, defaultStyles.active)
  }

  if (direction === DIRECTION.up) {
    defaultStylesCopy.group = mergeStyles(defaultStyles.group, defaultStyles.rotated)
  }

  styles = mergeStyles(defaultStylesCopy, styles)

  return (
    <svg width="16" height="24" viewBox="0 0 16 24" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
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
