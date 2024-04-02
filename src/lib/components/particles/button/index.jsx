import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function Button({ styles, children }) {
  styles = mergeStyles(defaultStyles, styles)

  return <button className={styles.button}>{children}</button>
}
