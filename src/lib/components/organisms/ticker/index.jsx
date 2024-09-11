import { toChildArray } from "preact"
import {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "preact/hooks"
import { useContainerSize } from "$shared/hooks/useContainerSize"
import { Gradient } from "./gradient"
import { ArrowButton, Button } from "$particles"
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
  const [verticalMobileLayout, setVerticalMobileLayout] =
    useState(verticalAtMobile)

  const childArray = toChildArray(children)

  const containerSize = useContainerSize(tickerRef)
  const mobLandscapeW = 480
  const containerWidth = containerSize ? containerSize.width : 600
  const isMobile = containerWidth < mobLandscapeW

  useEffect(() => {
    setVerticalMobileLayout(verticalAtMobile && isMobile)
  }, [isMobile, verticalAtMobile])

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    const pageWidth = tickerItemsContainer.clientWidth * 0.75
    setPageWidth(pageWidth)

    const numberOfPages = Math.ceil(
      tickerScrollRef.current.scrollWidth / pageWidth,
    )
    setNumberOfPages(numberOfPages)
  }, [childArray])

  useEffect(() => {
    const hideButtons = childArray.length < 4
    setHideButtons(hideButtons)
  }, [childArray])

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
      className={verticalAtMobile ? styles.ticker : styles.tickerHorizontal}
      style={`--ticker-offset: ${offsetWidth}px;`}
      data-expanded={expanded}
    >
      <div ref={tickerItemsRef} className={styles.tickerItems}>
        <div
          ref={tickerScrollRef}
          className={
            verticalAtMobile
              ? styles.tickerScroll
              : styles.tickerScrollHorizontal
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

        {verticalMobileLayout && (
          <div className={styles.button}>
            <Button
              type="regular"
              styles={{ buttonInner: styles.buttonInner }}
              onClick={toggleExpandedState}
            >
              {expanded ? "Show fewer" : `Show ${maxItems} most recent`}
            </Button>
          </div>
        )}
        {!isMobile && (
          <div className={styles.buttons}>
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
        )}
      </div>
    </div>
  )
}
