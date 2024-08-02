import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const FirstPastThePostWaffle = ({ styles, children, lineOverHang }) => {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <div className={styles.wrapper}>
      <p style={{ height: lineOverHang + 20 }} className={styles.halfLineText}>
        {children.halfLineText}
      </p>
      <div className={styles.line}>&nbsp;</div>
      {children.waffle}
    </div>
  )
}
