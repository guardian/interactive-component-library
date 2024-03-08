import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const ToplineResult = ({ name, total, change, children, styles, displayRow=false }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)
  const displayStyle = displayRow ? styles.displayRow : styles.displayColumn

  return (
    <div class={styles.toplineResult}>
      <div class={styles.topRow}><span class={styles.name}>{name}</span>{children}</div>
      <div class={`${styles.displayNumbers} ${displayStyle}`}>
        <div class={styles.total}>{total}</div>
        <div class={styles.change}>{change}</div>
      </div>
    </div>
  )
}
