import { useLayoutEffect, useEffect, useRef, useState } from 'preact/hooks'
import { useTooltipTarget } from './useTooltipTarget'
import { createPortal } from 'preact/compat'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import { Modal } from './modal'
import defaultStyles from './style.module.css'

export const TooltipType = {
  float: 'float',
  modal: 'modal',
}

export function Tooltip({ for: targetElement, renderIn: refOrSelector, type = TooltipType.float, styles, children }) {
  if (!targetElement) throw new Error('Target for tooltip cannot be undefined')

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [displayElement, setDisplayElement] = useState(null)

  const trackPosition = typeof children === 'function'
  const { targetRect, positionInTarget, hoverActive } = useTooltipTarget(targetElement, trackPosition)
  const tooltipRef = useRef(null)

  styles = mergeStyles(defaultStyles, styles)

  useEffect(() => {
    let element = null
    if (typeof refOrSelector === 'string') {
      element = document.querySelector(refOrSelector)
    } else if ('current' in refOrSelector) {
      element = refOrSelector.current
    } else {
      throw new Error('renderIn prop needs to be a selector or ref (from useRef)')
    }
    setDisplayElement(element)
  }, [refOrSelector])

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

  const fixedStyle =
    type === TooltipType.modal
      ? {}
      : {
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
    type === TooltipType.modal ? <Modal visible={hoverActive}>{tooltip}</Modal> : tooltip,
    displayElement,
  )
}

function tooltipPositionForPoint({ positionInTarget, tooltip, displayElement }) {
  const displayElementRect = displayElement.getBoundingClientRect()

  const newPosition = {
    x: positionInTarget.x + displayElementRect.x,
    y: positionInTarget.y + displayElementRect.y,
  }

  const tooltipWidth = tooltip.offsetWidth
  const tooltipHeight = tooltip.offsetHeight

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
