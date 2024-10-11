import { toChildArray } from "preact"
import {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  useCallback,
} from "preact/hooks"
import { CSSTransition, TransitionGroup } from "preact-transitioning"
import { useContainerSize } from "$shared/hooks/useContainerSize"
import { TickerControlsDesktop } from "./lib/TickerControlsDesktop"
import { TickerControlsMobileVertical } from "./lib/TickerControlsMobileVertical"
import { getOffsetDistance } from "./lib/helpers/tickerHelper"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.scss"

export function Ticker({
  maxItems = 20,
  onStateChange,
  verticalAtMobile = false,
  styles,
  children,
}) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  const [pageIndex, setPageIndex] = useState(0)
  const [scrollElWidth, setScrollElWidth] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(0)

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

  const pageWidthModifier = 0.75

  useLayoutEffect(() => {
    const tickerItemsContainer = tickerItemsRef.current
    const containerWidth = tickerItemsContainer.clientWidth * pageWidthModifier // don't scroll entire set of items offscreen, keep quarter of them
    const tickerScrollEl = tickerScrollRef.current
    setScrollElWidth(tickerScrollEl.scrollWidth)

    const numberOfPages = tickerScrollEl.scrollWidth / containerWidth

    setNumberOfPages(numberOfPages)
  }, [childArray])

  const offsetWidth = useMemo(() => {
    let res = getOffsetDistance(
      pageIndex,
      numberOfPages,
      scrollElWidth,
      pageWidthModifier,
    )
    return res
  }, [pageIndex, numberOfPages, scrollElWidth])

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
          {Array.isArray(childArray) && childArray.length > 0 && (
            <TransitionGroup>
              {childArray.map((child, index) => (
                <CSSTransition
                  key={child?.props?.id ?? index}
                  duration={600}
                  classNames={styles}
                >
                  <div className={styles.tickerItem}>{child}</div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
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
          tickerScrollRef={tickerScrollRef}
        />
      )}
    </div>
  )
}
