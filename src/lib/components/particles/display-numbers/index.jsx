import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const DisplayNumbers = ({ total, change, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <div class={styles.displayNumbers}>
      <div class={styles.total}>{total}</div>
      <div class={styles.change}>{change}</div>
    </div>
  )
}