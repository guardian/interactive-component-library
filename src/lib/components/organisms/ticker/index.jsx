import { toChildArray } from 'preact'
import { useState } from 'preact/hooks'
import { Gradient } from './gradient'
import { ArrowButton } from '$particles/arrow-button/index'
import styles from './style.module.css'

export function Ticker({ children }) {
  const [offset, setOffset] = useState(0)
  const childArray = toChildArray(children)

  return (
    <div className={styles.ticker} style={`--ticker-offset: ${offset}`}>
      <div className={styles.tickerItems}>
        {childArray.map((child, index) => (
          <div className={styles.tickerItem} key={index}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <div className={styles.gradient}>
          <Gradient />
        </div>
        <div className={styles.buttons}>
          <ArrowButton onClick={() => setOffset((d) => d + 1)} disabled={offset >= childArray.length - 4} />
          <ArrowButton direction="left" onClick={() => setOffset((d) => d - 1)} disabled={offset <= 0} />
        </div>
      </div>
    </div>
  )
}
