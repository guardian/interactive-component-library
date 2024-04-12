import { toChildArray } from 'preact'
import styles from './style.module.scss'

export const GridType = {
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export function ResponsiveGrid({ type = GridType.medium, children }) {
  return (
    <div className={styles.grid} data-grid-type={type}>
      {toChildArray(children).map((child, index) => {
        return (
          <div key={index} className={styles.gridItem}>
            {child}
          </div>
        )
      })}
    </div>
  )
}
