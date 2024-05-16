import { forwardRef } from 'preact/compat'
import { useLayoutEffect, useRef, useState } from 'preact/hooks'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.scss'

export const PageSection = forwardRef(
  ({ children, styles, borderTop = false, backgroundColor = 'transparent' }, ref) => {
    styles = mergeStyles({ ...defaultStyles }, styles)

    const [minHeight, setMinHeight] = useState('auto')
    const headerRef = useRef()

    useLayoutEffect(() => {
      const headerElement = headerRef.current
      setMinHeight(headerElement.offsetHeight)
    }, [children])

    return (
      <section
        ref={ref}
        className={[styles.section, borderTop && styles.borderTop].join(' ')}
        style={{ '--background-color': backgroundColor, minHeight }}
      >
        <div className={styles.header} ref={headerRef}>{children.header}</div>
        <div className={styles.content}>{children.content}</div>
      </section>
    )
  },
)
