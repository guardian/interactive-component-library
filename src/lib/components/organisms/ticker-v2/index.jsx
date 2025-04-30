import { toChildArray } from "preact"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.scss"
import { Gradient } from "./Gradient.jsx"
import { ArrowButton } from "$particles"
import { useRef, useState, useEffect } from "preact/hooks"

export function Ticker({ buttonScrollDistance = 250, styles, children }) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  const [isScrolledToStart, setIsScrolledToStart] = useState(true)
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false)
  const [isOverflow, setIsOverflow] = useState(false)

  const childArray = toChildArray(children)
  const scrollContainerRef = useRef(null)

  function scrubLeft() {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let newScrollLeft = scrollContainer.scrollLeft - buttonScrollDistance

    if (newScrollLeft < 100) {
      newScrollLeft = 0
    }

    scrollContainer.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  function scrubRight() {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollSpace = scrollContainer.scrollWidth - scrollContainer.clientWidth
    let newScrollLeft = scrollContainer.scrollLeft + buttonScrollDistance

    if (newScrollLeft > scrollSpace - 100) {
      // Plus one here to account for any fractional numbers
      newScrollLeft = scrollSpace + 1
    }

    scrollContainer.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let scrollDebounceTimeout

    const handleScroll = () => {
      clearTimeout(scrollDebounceTimeout)

      scrollDebounceTimeout = setTimeout(() => {
        const currentScroll = scrollContainer.scrollLeft
        const scrollSpace =
          scrollContainer.scrollWidth - scrollContainer.clientWidth - 4

        setIsScrolledToEnd(currentScroll > scrollSpace)
        setIsScrolledToStart(currentScroll === 0)
      }, 20)
    }

    scrollContainer.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(scrollDebounceTimeout)
      scrollContainer.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
      setIsOverflow(true)
    }
  }, [children])

  return (
    <div className={styles.ticker}>
      <div ref={scrollContainerRef} className={styles.scrollContainer}>
        {childArray.map((child, index) => (
          <div className={styles.tickerItem} key={child.props?.id ?? index}>
            {child}
          </div>
        ))}
      </div>

      <div
        className={`${styles.scrubControls} ${isOverflow ? styles.showControls : ""}`}
      >
        <Gradient position="right" />
        <ArrowButton
          styles={{ button: styles.arrowButton }}
          onClick={scrubRight}
          disabled={isScrolledToEnd}
        />
        <ArrowButton
          styles={{ button: styles.arrowButton }}
          direction="left"
          onClick={scrubLeft}
          disabled={isScrolledToStart}
        />
      </div>
    </div>
  )
}
