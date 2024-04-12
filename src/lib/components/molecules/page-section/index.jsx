import { forwardRef } from 'preact/compat'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.scss'

export const PageSection = forwardRef(
  ({ children, styles, borderTop = false, backgroundColor = 'transparent' }, ref) => {
    styles = mergeStyles({ ...defaultStyles }, styles)

    return (
      <section
        ref={ref}
        className={[styles.section, borderTop && styles.borderTop].join(' ')}
        style={{ '--background-color': backgroundColor }}
      >
        <div className={styles.header}>{children.header}</div>
        <div className={styles.content}>{children.content}</div>
      </section>
    )
  },
)
