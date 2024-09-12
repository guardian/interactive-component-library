import { toChildArray } from "preact"
import {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback,
} from "preact/hooks"
import { useContainerSize } from "$shared/hooks/useContainerSize"
import { TickerControlsDesktop } from "./lib/TickerControlsDesktop"
import { TickerControlsMobileVertical } from "./lib/TickerControlsMobileVertical"
import styles from "./style.module.scss"

export function Ticker({
  maxItems = 20,
  onStateChange,
  verticalAtMobile = false,
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

  const containerSize = useContainerSize(tickerRef)
  const mobLandscapeW = 480
  const containerWidth = containerSize ? containerSize.width : 600
  const isMobile = containerWidth < mobLandscapeW

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    const pageWidth = tickerItemsContainer.clientWidth * 0.75
    setPageWidth(pageWidth)

    const numberOfPages = Math.ceil(
      tickerScrollRef.current.scrollWidth / pageWidth,
    )
    setNumberOfPages(numberOfPages)
  }, [childArray])

  // debugger;

  useEffect(() => {
    const hideButtons = childArray.length < 4
    setHideButtons(hideButtons)
  }, [childArray])

  const toggleExpandedState = useCallback(() => {
    if (expanded) {
      tickerRef.current.scrollIntoView({ behavior: "smooth", alignToTop: true }) //scroll user up to top of ticker when closing at mobile
    }
    setExpanded((expanded) => {
      const newState = !expanded
      if (onStateChange) onStateChange({ expanded: newState })
      return newState
    })
  }, [expanded, onStateChange])

  return (
    <div
      ref={tickerRef}
      className={verticalAtMobile ? styles.tickerVertical : styles.ticker}
      style={`--ticker-offset: ${offsetWidth}px;`}
      data-expanded={expanded}
    >
      <div ref={tickerItemsRef} className={styles.tickerItems}>
        <div
          ref={tickerScrollRef}
          className={
            verticalAtMobile ? styles.tickerScrollVertical : styles.tickerScroll
          }
        >
          {childArray.map((child, index) => (
            <div className={styles.tickerItem} key={child?.props?.id ?? index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      {isMobile && !verticalAtMobile && (
        <div className={styles.gradientHorizontal}></div>
      )}

      {isMobile && verticalAtMobile && (
        <TickerControlsMobileVertical
          hideButtons={hideButtons}
          controlsRef={controlsRef}
          toggleExpandedState={toggleExpandedState}
          buttonText={expanded ? "Show fewer" : `Show ${maxItems} most recent`}
        />
      )}

      {!isMobile && (
        <TickerControlsDesktop
          hideButtons={hideButtons}
          controlsRef={controlsRef}
          setPageIndex={setPageIndex}
          pageIndex={pageIndex}
          numberOfPages={numberOfPages}
        />
      )}
    </div>
  )
}
