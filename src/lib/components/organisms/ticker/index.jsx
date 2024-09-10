import { toChildArray } from "preact"
import { useState, useRef, useLayoutEffect, useMemo } from "preact/hooks"
import { Gradient } from "./gradient"
import { ArrowButton, Button } from "$particles"
import styles from "./style.module.scss"

export function Ticker({
  maxItems = 20,
  onStateChange,
  horizontalAtMobile = false,
  children,
}) {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageWidth, setPageWidth] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)

  const offsetWidth = useMemo(() => {
    return -pageIndex * (pageWidth || 0)
  }, [pageIndex, pageWidth])

  const tickerRef = useRef()
  const tickerItemsRef = useRef()
  const tickerScrollRef = useRef()
  const controlsRef = useRef()

  const [hideButtons, setHideButtons] = useState(false)

  const [expanded, setExpanded] = useState(false)

  const childArray = toChildArray(children)

  const mobLandscapeW = 480

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    const pageWidth = tickerItemsContainer.clientWidth * 0.75
    setPageWidth(pageWidth)

    const numberOfPages = Math.ceil(
      tickerScrollRef.current.scrollWidth / pageWidth,
    )
    setNumberOfPages(numberOfPages)
  }, [childArray])

  useLayoutEffect(() => {
    const hideButtons =
      childArray.length < 4 || (horizontalAtMobile && pageWidth < mobLandscapeW)

    setHideButtons(hideButtons)
  }, [childArray, horizontalAtMobile, pageWidth])

  function toggleExpandedState() {
    if (expanded) {
      tickerRef.current.scrollIntoView({ behavior: "smooth", alignToTop: true }) //scroll user up to top of ticker when closing at mobile
    }
    setExpanded((expanded) => {
      const newState = !expanded
      if (onStateChange) onStateChange({ expanded: newState })
      return newState
    })
  }

  return (
    <div
      ref={tickerRef}
      className={horizontalAtMobile ? styles.tickerHorizontal : styles.ticker}
      style={`--ticker-offset: ${offsetWidth}px;`}
      data-expanded={expanded}
    >
      <div ref={tickerItemsRef} className={styles.tickerItems}>
        <div
          ref={tickerScrollRef}
          className={
            horizontalAtMobile
              ? styles.tickerScrollHorizontal
              : styles.tickerScroll
          }
        >
          {childArray.map((child, index) => (
            <div className={styles.tickerItem} key={child?.props?.id ?? index}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div
        ref={controlsRef}
        className={styles.controls}
        style={hideButtons && { display: "none" }}
      >
        <div className={styles.gradient}>
          <Gradient />
        </div>

        <div
          className={
            horizontalAtMobile ? styles.buttonsHorizontal : styles.buttons
          }
        >
          <ArrowButton
            onClick={() => setPageIndex((d) => d + 1)}
            disabled={pageIndex >= numberOfPages - 2}
          />
          <ArrowButton
            direction="left"
            onClick={() => setPageIndex((d) => d - 1)}
            disabled={pageIndex <= 0}
          />
        </div>

        <div
          className={
            horizontalAtMobile ? styles.buttonHorizontal : styles.button
          }
        >
          <Button
            type="regular"
            styles={{ buttonInner: styles.buttonInner }}
            onClick={toggleExpandedState}
          >
            {expanded ? "Show fewer" : `Show ${maxItems} most recent`}
          </Button>
        </div>

        {horizontalAtMobile && (
          <div className={styles.gradient}>
            <Gradient />
          </div>
        )}
      </div>
    </div>
  )
}
