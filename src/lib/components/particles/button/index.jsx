import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function Button({ type = 'regular', styles, children }) {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <button className={styles.button} data-type={type}>
      <div className={styles.buttonInner}>{children}</div>
    </button>
  )
}
