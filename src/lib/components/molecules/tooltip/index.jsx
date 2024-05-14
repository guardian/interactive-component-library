import { useLayoutEffect, useEffect, useRef, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { rectsIntersect } from '$shared/helpers/geometry'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.css'

export function Tooltip({ for: targetElement, touchRect, positionInTarget, show = true, styles, children }) {
  if (!targetElement) throw new Error('Target for tooltip cannot be undefined')

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [displayElement, setDisplayElement] = useState(null)

  const tooltipRef = useRef()

  styles = mergeStyles(defaultStyles, styles)

  useEffect(() => {
    setDisplayElement(document.querySelector('body'))

    return () => {
      setDisplayElement(null)
    }
  }, [])

  useLayoutEffect(() => {
    if (!tooltipRef.current) return

    const targetRect = targetElement.getBoundingClientRect()

    if (positionInTarget) {
      const newPosition = tooltipPositionForPoint({
        targetRect,
        positionInTarget,
        tooltip: tooltipRef.current,
        displayElement,
      })
      setTooltipPosition(newPosition)
    } else if (!positionInTarget) {
      const newPosition = tooltipPositionForRect({
        targetRect,
        touchRect,
        tooltip: tooltipRef.current,
        displayElement,
      })
      setTooltipPosition(newPosition)
    }
  }, [targetElement, positionInTarget, displayElement, tooltipRef, touchRect])

  if (!displayElement) return

  const fixedStyle = {
    display: show ? 'block' : 'none',
    position: 'fixed',
    left: tooltipPosition.x,
    top: tooltipPosition.y,
    zIndex: 100,
  }

  const tooltip = (
    <div ref={tooltipRef} className={styles.tooltip} style={fixedStyle}>
      {children}
    </div>
  )

  return createPortal(tooltip, displayElement)
}

function tooltipPositionForPoint({ targetRect, positionInTarget, tooltip, displayElement }) {
  const newPosition = {
    x: positionInTarget.x + targetRect.x,
    y: positionInTarget.y + targetRect.y,
  }

  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight

  const displayElementRect = displayElement.getBoundingClientRect()

  if (newPosition.x + tooltipWidth > displayElementRect.right) {
    newPosition.x -= tooltipWidth
  }

  if (newPosition.y + tooltipHeight > displayElementRect.bottom) {
    newPosition.y -= tooltipHeight
  }

  if (newPosition.x <= displayElementRect.left) {
    newPosition.x = displayElementRect.left + displayElementRect.width / 2 - tooltipWidth / 2
  }

  return newPosition
}

function tooltipPositionForRect({
  targetRect,
  touchRect = { x: 0, y: 0, width: 0, height: 0 },
  tooltip,
  displayElement,
}) {
  // touchRect is defined relative to the targetRect

  // start with top-right position
  const newPosition = {
    x: targetRect.right,
    y: targetRect.top,
  }

  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight

  const tooltipRect = {
    ...newPosition,
    width: tooltipWidth,
    height: tooltipHeight,
  }

  if (rectsIntersect(tooltipRect, touchRect)) {
    // tooltip rect intersects with touch rect, which means it will be (partially) obscured by the user's finger
    newPosition.x = touchRect.x + touchRect.width / 2
    newPosition.y = touchRect.y - tooltipHeight
  }

  const displayElementRect = displayElement.getBoundingClientRect()

  if (newPosition.x + tooltipWidth > displayElementRect.right) {
    newPosition.x = targetRect.left - tooltipWidth
  }

  if (newPosition.y - tooltipHeight < displayElementRect.top) {
    newPosition.y = targetRect.bottom
  }

  if (newPosition.x <= displayElementRect.left) {
    newPosition.x = displayElementRect.left + displayElementRect.width / 2 - tooltipWidth / 2
  }

  return newPosition
}
