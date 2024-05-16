import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const FirstPastThePostWaffle = ({ styles, children }) => {
  styles = mergeStyles(defaultStyles, styles)
  
  return (
    <div class={styles.wrapper}>
      {children.halfLineText}
      {children.halfLine}
      {children.waffle}
    </div>
  )
}