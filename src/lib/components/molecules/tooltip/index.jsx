import { useLayoutEffect, useEffect, useRef, useState } from 'preact/hooks'
import { useMousePosition } from './useMousePosition'
import { createPortal } from 'preact/compat'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import { Modal } from './modal'
import defaultStyles from './style.module.css'

export const TooltipType = {
  float: 'float',
  modal: 'modal',
}

export function Tooltip({ for: element, renderIn: refOrSelector, type = TooltipType.float, styles, children }) {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [displayElement, setDisplayElement] = useState(null)
  const [mousePosition, hoverActive] = useMousePosition(element)
  const tooltipRef = useRef(null)

  styles = mergeStyles(defaultStyles, styles)

  useEffect(() => {
    let element = null
    if (typeof refOrSelector === 'string') {
      element = document.querySelector(refOrSelector)
    } else if ('current' in refOrSelector) {
      element = refOrSelector.current
    } else {
      throw 'renderIn prop needs to be a selector or ref (from useRef)'
    }
    setDisplayElement(element)
  }, [refOrSelector])

  useLayoutEffect(() => {
    if (!tooltipRef.current || !mousePosition) return
    const elementRect = element.getBoundingClientRect()

    const newPosition = {
      x: mousePosition.x + elementRect.x,
      y: mousePosition.y + elementRect.y,
    }

    const tooltipWidth = tooltipRef.current.offsetWidth
    const tooltipHeight = tooltipRef.current.offsetHeight
    const displayElementRect = displayElement.getBoundingClientRect()
    if (newPosition.x + tooltipWidth > displayElementRect.right) {
      newPosition.x -= tooltipWidth
    }
    if (newPosition.y + tooltipHeight > displayElementRect.bottom) {
      newPosition.y -= tooltipHeight
    }

    setTooltipPosition(newPosition)
  }, [element, displayElement, tooltipRef, mousePosition])

  if (!displayElement) return

  const fixedStyle =
    type === TooltipType.modal
      ? {}
      : { display: hoverActive ? 'block' : 'none', position: 'fixed', left: tooltipPosition.x, top: tooltipPosition.y }

  const tooltip = (
    <div ref={tooltipRef} className={styles.tooltip} style={fixedStyle}>
      {mousePosition && children(mousePosition)}
    </div>
  )

  return createPortal(
    type === TooltipType.modal ? <Modal visible={hoverActive}>{tooltip}</Modal> : tooltip,
    displayElement,
  )
}
