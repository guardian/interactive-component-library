import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'



export function SeatCard({ title, children, styles }) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return <div className={styles.card}>
    <div className={styles.title}>{title}</div>
    {children}</div>
}
