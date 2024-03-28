import { toChildArray } from 'preact'
import { useState, useRef, useLayoutEffect } from 'preact/hooks'
import { Gradient } from './gradient'
import { ArrowButton } from '$particles/arrow-button/index'
import styles from './style.module.css'

function totalWidthForElements(elements) {
  return Array.from(elements).reduce((totalWidth, element) => {
    totalWidth += element.clientWidth
    return totalWidth
  }, 0)
}

export function Ticker({ children }) {
  const [offset, setOffset] = useState(0)

  const tickerItemsRef = useRef()
  const [hideButtons, setHideButtons] = useState(false)

  const childArray = toChildArray(children)

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    if (tickerItemsContainer) {
      const totalWidth = totalWidthForElements(tickerItemsContainer.children)
      const hideButtons = totalWidth < tickerItemsContainer.clientWidth
      setHideButtons(hideButtons)
    }
  }, [setHideButtons, childArray])

  return (
    <div className={styles.ticker} style={`--ticker-offset: ${offset}`}>
      <div ref={tickerItemsRef} className={styles.tickerItems}>
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
        <div className={styles.buttons} style={hideButtons && { display: 'none' }}>
          <ArrowButton onClick={() => setOffset((d) => d + 1)} disabled={offset >= childArray.length - 4} />
          <ArrowButton direction="left" onClick={() => setOffset((d) => d - 1)} disabled={offset <= 0} />
        </div>
      </div>
    </div>
  )
}
