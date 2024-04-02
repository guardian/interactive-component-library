import { toChildArray } from 'preact'
import { useState, useRef, useLayoutEffect } from 'preact/hooks'
import { useWindowSize } from '$shared/hooks/useWindowSize'
import { Gradient } from './gradient'
import { ArrowButton, Button } from '$particles'
import styles from './style.module.scss'

function totalSizeForElements(elements) {
  return Array.from(elements).reduce(
    (totalSize, element) => {
      totalSize.width += element.clientWidth
      totalSize.height += element.clientHeight
      return totalSize
    },
    { width: 0, height: 0 },
  )
}

export function Ticker({ children }) {
  const [offset, setOffset] = useState(0)
  const windowSize = useWindowSize()

  const tickerItemsRef = useRef()
  const [hideButtons, setHideButtons] = useState(false)
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false)

  const childArray = toChildArray(children)

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    if (tickerItemsContainer) {
      const { width, height } = totalSizeForElements(tickerItemsContainer.children)
      const hideButtons =
        windowSize.width >= 480
          ? width <= tickerItemsContainer.clientWidth
          : height <= tickerItemsContainer.clientHeight
      setHideButtons(hideButtons)

      if (tickerItemsContainer.children.length > 0) {
        const itemWidth = tickerItemsContainer.children[0].clientWidth
        const nextButtonDisabled = offset * itemWidth > width - tickerItemsContainer.clientWidth
        setNextButtonDisabled(nextButtonDisabled)
      }
    }
  }, [offset, windowSize, childArray, setHideButtons, setNextButtonDisabled])

  return (
    <div className={styles.ticker} style={`--ticker-offset: ${offset}`}>
      <div ref={tickerItemsRef} className={styles.tickerItems}>
        {childArray.map((child, index) => (
          <div className={styles.tickerItem} key={index}>
            {child}
          </div>
        ))}
      </div>
      <div className={styles.controls} style={hideButtons && { display: 'none' }}>
        <div className={styles.gradient}>
          <Gradient />
        </div>
        <div className={styles.buttons}>
          <ArrowButton onClick={() => setOffset((d) => d + 1)} disabled={nextButtonDisabled} />
          <ArrowButton direction="left" onClick={() => setOffset((d) => d - 1)} disabled={offset <= 0} />
        </div>
        <div className={styles.button}>
          <Button>Show 20 most recent</Button>
        </div>
      </div>
    </div>
  )
}
