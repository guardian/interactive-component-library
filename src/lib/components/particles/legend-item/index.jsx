import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

const DOT_TYPE = {
  round: "round",
  square: "square",
}

export const LegendItem = ({
  dotType = DOT_TYPE.round,
  text,
  styles,
  abbreviation,
}) => {
  const defaultStylesCopy = { ...defaultStyles }

  if (dotType === DOT_TYPE.round) {
    defaultStylesCopy.dot = mergeStyles(defaultStyles.dot, defaultStyles.circle)
  }

  styles = mergeStyles(defaultStylesCopy, styles)
  return (
    <div className={styles.container}>
      <span className={`${styles.dot} bg-color--${abbreviation}`} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
