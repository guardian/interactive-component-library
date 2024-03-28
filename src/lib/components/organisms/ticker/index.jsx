import { toChildArray } from 'preact'
import { Gradient } from './gradient'
import styles from './style.module.css'

export function Ticker({ children }) {
  return (
    <div className={styles.ticker}>
      <div className={styles.tickerItems}>
        {toChildArray(children).map((child, index) => (
          <div className={styles.tickerItem} key={index}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles.gradient}>
        <Gradient />
      </div>
    </div>
  )
}
