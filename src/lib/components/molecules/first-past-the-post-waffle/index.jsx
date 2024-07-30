import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const FirstPastThePostWaffle = ({ styles, children, lineOverHang }) => {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <div class={styles.wrapper}>
      <p style={{ height: lineOverHang + 20 }} class={styles.halfLineText}>
        {children.halfLineText}
      </p>
      <div class={styles.line}>&nbsp;</div>
      {children.waffle}
    </div>
  )
}
