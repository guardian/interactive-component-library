import { useLayoutEffect, useEffect, useRef, useState } from 'preact/hooks'
import { useTooltipTarget } from './useTooltipTarget'
import { createPortal } from 'preact/compat'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.css'

export function Tooltip({ for: targetElement, styles, children }) {
  if (!targetElement) throw new Error('Target for tooltip cannot be undefined')

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [displayElement, setDisplayElement] = useState(null)

  const trackPosition = typeof children === 'function'
  const { targetRect, positionInTarget, hoverActive } = useTooltipTarget(targetElement, trackPosition)
  const tooltipRef = useRef(null)

  styles = mergeStyles(defaultStyles, styles)

  useEffect(() => {
    setDisplayElement(document.querySelector("body"))

    return () => {
      setDisplayElement(null)
    }
  }, [])

  useLayoutEffect(() => {
    if (!tooltipRef.current) return

    if (trackPosition && positionInTarget) {
      const newPosition = tooltipPositionForPoint({
        targetRect,
        positionInTarget,
        tooltip: tooltipRef.current,
        displayElement,
      })
      setTooltipPosition(newPosition)
    } else if (!trackPosition) {
      const newPosition = tooltipPositionForRect({ targetRect, tooltip: tooltipRef.current, displayElement })
      setTooltipPosition(newPosition)
    }
  }, [trackPosition, targetRect, positionInTarget, displayElement, tooltipRef])

  if (!displayElement) return

  const displayTooltip = hoverActive || !trackPosition

  const fixedStyle = {
    display: displayTooltip ? 'block' : 'none',
    position: 'fixed',
    left: tooltipPosition.x,
    top: tooltipPosition.y,
    zIndex: 100,
  }

  const tooltip = (
    <div ref={tooltipRef} className={styles.tooltip} style={fixedStyle}>
      {positionInTarget && children(positionInTarget)}
      {!trackPosition && children}
    </div>
  )

  return createPortal(
    tooltip,
    displayElement,
  )
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

  return newPosition
}

function tooltipPositionForRect({ targetRect, tooltip, displayElement }) {
  // start with top-right position
  const newPosition = {
    x: targetRect.right,
    y: targetRect.top,
  }

  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight

  const displayElementRect = displayElement.getBoundingClientRect()

  if (newPosition.x + tooltipWidth > displayElementRect.right) {
    newPosition.x = targetRect.left - tooltipWidth
  }

  if (newPosition.y - tooltipHeight < displayElementRect.top) {
    newPosition.y = targetRect.bottom
  }

  return newPosition
}
