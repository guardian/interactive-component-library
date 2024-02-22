import defaultStyles from './legenditem.module.css'
import { mergeStyles } from '$shared/styles/mergeStyles'

export const LegendItem = ({ text, styles }) => {
  styles = mergeStyles(defaultStyles, styles)
  return (
    <div className={styles.container}>
      <span className={styles.dot} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
