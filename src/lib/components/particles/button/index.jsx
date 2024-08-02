import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export function Button({ type = "regular", onClick, styles, children }) {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <button className={styles.button} data-type={type} onClick={onClick}>
      <div className={styles.buttonInner}>{children}</div>
    </button>
  )
}
