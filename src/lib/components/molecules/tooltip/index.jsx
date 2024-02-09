import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { useMousePosition } from './useMousePosition'
import { createPortal } from 'react-dom'

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
    const displayElementRect = displayElement.getBoundingClientRect()
    if (newPosition.x + tooltipWidth > displayElementRect.right) {
      newPosition.x -= tooltipWidth
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

// export const Tooltip = React.memo(
//   ({ children, width, bboxTop, containerRef, containerBounds, innerWidth, innerHeight }) => {
//     const ttRef = useRef(null)
//     const [bbTop] = useState(containerBounds.top)

//     const ttBox = ttRef.current && ttRef.current.getBoundingClientRect()
//     const ttWidth = width || (ttRef.current && ttBox.width)
//     const ttHeight = ttRef.current && ttBox.height

//     const useMousePosition = () => {
//       const [eCoords, setECoords] = useState({ clientX: 0, clientY: 0 })

//       const eventHandler = useCallback(
//         ({ clientX, clientY }) => {
//           requestAnimationFrame(() => setECoords({ clientX, clientY }))
//         },
//         [setECoords],
//       )

//       useEffect(() => {
//         containerRef.current.addEventListener('mousemove', eventHandler)

//         return () => {
//           containerRef.current.removeEventListener('mousemove', eventHandler)
//         }
//       }, [containerRef])
//       return eCoords
//     }

//     const { clientX, clientY } = useMousePosition()
//     const offsetX = clientX - ttWidth / 2 < 0 ? clientX - ttWidth / 2 : 0
//     const offsetY = clientY + ttHeight > innerHeight ? -ttHeight - 15 : 25
//     const left = clientX - containerBounds.left - ttWidth / 2 - offsetX
//     const top = innerWidth < 980 ? clientY - bbTop + 36 + offsetY : clientY - bboxTop + offsetY

//     return (
//       <div
//         class="gv-tooltip"
//         ref={ttRef}
//         style={innerWidth < 740 ? null : { position: 'absolute', left, top, width: `${ttWidth}px` }}
//       >
//         {children}
//       </div>
//     )
//   },
// )
