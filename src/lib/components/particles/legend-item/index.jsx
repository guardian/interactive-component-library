import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

const DOT_TYPE = {
  ROUND: 'ROUND',
  SQUARE: 'SQUARE',
}

export const LegendItem = ({ dotType = DOT_TYPE.ROUND, text, styles }) => {
  if (dotType === DOT_TYPE.ROUND) {
    defaultStyles.dot = mergeStyles(defaultStyles.dot, defaultStyles.circle)
  }

  styles = mergeStyles(defaultStyles, styles)
  return (
    <div className={styles.container}>
      <span className={styles.dot} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
