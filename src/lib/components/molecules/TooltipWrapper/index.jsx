import React, { useState, useRef, useCallback, useEffect } from 'react'
// import { usePrevious } from 'shared/js/util'

export const TooltipWrapper = React.memo(
  ({ children, width, bboxTop, containerRef, containerBounds, innerWidth, innerHeight }) => {
    const ttRef = useRef(null)
    const [bbTop, setBbtop] = useState(containerBounds.top)
    // const prevSelected = usePrevious(selected)

    // if (innerWidth < 980) {
    //   if (!prevSelected || prevSelected.code !== selected.code) {
    //     setBbtop(containerBounds.top)
    //   }
    // }
    const ttBox = ttRef.current && ttRef.current.getBoundingClientRect()
    const ttWidth = width || (ttRef.current && ttBox.width)
    const ttHeight = ttRef.current && ttBox.height

    const useMousePosition = () => {
      const [eCoords, setECoords] = useState({ clientX: 0, clientY: 0 })

      const eventHandler = useCallback(
        ({ clientX, clientY }) => {
          requestAnimationFrame(() => setECoords({ clientX, clientY }))
        },
        [setECoords],
      )

      useEffect(() => {
        containerRef.current.addEventListener('mousemove', eventHandler)

        return () => {
          containerRef.current.removeEventListener('mousemove', eventHandler)
        }
      }, [containerRef])
      return eCoords
    }

    const { clientX, clientY } = useMousePosition()
    const offsetX = clientX - ttWidth / 2 < 0 ? clientX - ttWidth / 2 : 0
    const offsetY = clientY + ttHeight > innerHeight ? -ttHeight - 15 : 25
    const left = clientX - containerBounds.left - ttWidth / 2 - offsetX
    const top = innerWidth < 980 ? clientY - bbTop + 36 + offsetY : clientY - bboxTop + offsetY

    return (
      <div
        class="gv-tt"
        ref={ttRef}
        style={innerWidth < 740 ? null : { position: 'absolute', left, top, width: `${ttWidth}px` }}
      >
        {children}
      </div>
    )
  },
)
