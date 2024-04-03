import defaultStyles from "./style.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const ToplineResult = ({ name, mainNumber, secondaryNumber, children, styles, displayRow=false, abbreviation, onMouseOver }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)
  const displayStyle = displayRow ? styles.displayRow : styles.displayColumn

  return (
    <div class={styles.toplineResult} onMouseOver={onMouseOver}>
      <div class={styles.topRow}><span class={`${styles.name} before-color--${abbreviation}`}>{name}</span>{children}</div>
      <div class={`${styles.displayNumbers} ${displayStyle}`}>
        <div class={styles.mainNumber}>{mainNumber}</div>
        <div class={styles.secondaryNumber}>{secondaryNumber}</div>
      </div>
    </div>
  )
}
