import { useLayoutEffect, useEffect, useRef, useState } from 'preact/hooks'
import { useMousePosition } from './useMousePosition'
import { createPortal } from 'preact/compat'

export function Tooltip({ for: elementRef, renderIn: refOrSelector, children }) {

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [displayElement, setDisplayElement] = useState(null)
  const mousePosition = useMousePosition(elementRef)
  const tooltipRef = useRef(null)

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
    if (!tooltipRef.current) return
    const elementRect = elementRef.current.getBoundingClientRect()

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
  }, [elementRef, displayElement, tooltipRef, mousePosition])

  if (!mousePosition || !displayElement) return

  const style = `position: fixed; left: ${tooltipPosition.x}px; top: ${tooltipPosition.y}px; pointer-events:none;`
  return createPortal(
    <div ref={tooltipRef} style={style}>
      {children(mousePosition)}
    </div>,
    displayElement,
  )
}
