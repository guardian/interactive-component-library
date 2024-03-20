import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function PageSection({ children, styles, borderTop = false }) {
  styles = mergeStyles({...defaultStyles}, styles)

  return (
    <section className={[styles.section, borderTop && styles.borderTop].join(' ')}>
      <div className={styles.header}>{children.header}</div>
      <div className={styles.content}>{children.content}</div>
    </section>
  )
}
