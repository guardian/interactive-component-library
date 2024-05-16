import { CircleIcon } from '$particles'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.scss'

export function RefreshIndicator({ text, styles }) {
  styles = mergeStyles(defaultStyles, styles)
  return (
    <div className={styles.refreshIndicator}>
      <span className={styles.icon}>
        <CircleIcon pulse={true} />
      </span>
      <span className={styles.liveText}>LIVE</span>
      <span className={styles.refreshText}>{text}</span>
    </div>
  )
}
