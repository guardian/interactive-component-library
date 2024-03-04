import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const HalfLineText = ({ text, height, styles }) => {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <svg class={styles.svg} width='100%' height={height}>
      <text class={styles.text} x='50%' y={0}>{text}</text>
    </svg>
  )
}