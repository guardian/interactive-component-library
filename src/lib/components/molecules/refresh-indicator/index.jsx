import { CircleIcon } from '$particles'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.css'

export function RefreshIndicator({ secondsUntilNext, styles }) {
  styles = mergeStyles(defaultStyles, styles)
  return (
    <div className={styles.refreshIndicator}>
      <CircleIcon pulse={true} />
      <span className={styles.liveText}>LIVE</span>
      <span className={styles.refreshText}>next refresh in {secondsUntilNext}s</span>
    </div>
  )
}
