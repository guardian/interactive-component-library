import { Waffle, HalfLineText } from '$particles'
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const FPTPWaffle = ({ total, units, rows, abbreviationAccessor, halfLineTextHeight, paddingTop, onMouseOver, squares, styles }) => {
  styles = mergeStyles(defaultStyles, styles)
  
  return (
    <div class={styles.wrapper}>
      <HalfLineText text={`${Math.ceil(total / 2)} for a majority`} height={halfLineTextHeight} />
      <Waffle total={total} paddingTop={paddingTop} abbreviationAccessor={abbreviationAccessor} showHalfLine={true} squares={squares} onMouseOver={onMouseOver} units={units} rows={rows} />
    </div>
  )
}