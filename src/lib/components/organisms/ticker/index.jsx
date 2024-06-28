import { toChildArray } from "preact"
import { useState, useRef, useLayoutEffect, useMemo } from "preact/hooks"
import { useWindowSize } from "$shared/hooks/useWindowSize"
import { Gradient } from "./gradient"
import { ArrowButton, Button } from "$particles"
import styles from "./style.module.scss"

export function Ticker({ maxItems = 20, onStateChange, children }) {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const offsetWidth = useMemo(() => {
    return -pageIndex * (pageWidth || 0)
  }, [pageIndex, pageWidth])

  const windowSize = useWindowSize()

  const tickerRef = useRef()
  const tickerItemsRef = useRef()
  const tickerScrollRef = useRef()
  const controlsRef = useRef()
  const topOfTickerAnchor = useRef()

  const [hideButtons, setHideButtons] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const childArray = toChildArray(children)

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    const pageWidth = tickerItemsContainer.clientWidth * 0.75
    setPageWidth(pageWidth)

    const numberOfPages = Math.ceil(tickerScrollRef.current.scrollWidth / pageWidth)
    setNumberOfPages(numberOfPages)
  }, [])

  useLayoutEffect(() => {
    const hideButtons = childArray.length < 4

    setHideButtons(hideButtons)
  }, [childArray])

  function toggleExpandedState() {
    if (expanded) {
      topOfTickerAnchor.current.scrollIntoView({ behavior: "smooth" }) //scroll user up to top of ticker when closing at mobile
    }
    setExpanded((expanded) => {
      const newState = !expanded
      if (onStateChange) onStateChange({ expanded: newState })
      return newState
    })
  }

  return (
    <>
      <div id="top-of-ticker-anchor" ref={topOfTickerAnchor} />
      <div ref={tickerRef} className={styles.ticker} style={`--ticker-offset: ${offsetWidth}px;`} data-expanded={expanded}>
        <div ref={tickerItemsRef} className={styles.tickerItems}>
          <div ref={tickerScrollRef} className={styles.tickerScroll}>
            {childArray.map((child, index) => (
              <div className={styles.tickerItem} key={index}>
                {child}
              </div>
            ))}
          </div>
        </div>
        <div ref={controlsRef} className={styles.controls} style={hideButtons && { display: "none" }}>
          <div className={styles.gradient}>
            <Gradient />
          </div>
          <div className={styles.buttons}>
            <ArrowButton onClick={() => setPageIndex((d) => d + 1)} disabled={pageIndex >= numberOfPages - 1} />
            <ArrowButton direction="left" onClick={() => setPageIndex((d) => d - 1)} disabled={pageIndex <= 0} />
          </div>
          <div className={styles.button}>
            <Button type="regular" styles={{ buttonInner: styles.buttonInner }} onClick={toggleExpandedState}>
              {expanded ? "Show fewer" : `Show ${maxItems} most recent`}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
