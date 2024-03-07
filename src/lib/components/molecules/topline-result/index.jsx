import { DisplayNumbers } from '$particles'
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const ToplineResult = ({ name, total, change, icon, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <div class={styles.toplineResult}>
      <div class={styles.topRow}><span class={styles.name}>{name}</span>{icon}</div>
      <DisplayNumbers total={total} change={change} />
    </div>
  )
}
