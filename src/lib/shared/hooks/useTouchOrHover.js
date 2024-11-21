// @ts-nocheck
import { useRef, useEffect, useState } from "preact/hooks"
import { pointInsideRect } from "$shared/helpers/geometry"

export function useTouchOrHover() {
  const ref = useRef()
  const [activeEvent, setActiveEvent] = useState()
  const [position, setPosition] = useState()
  const [isActive, setIsActive] = useState(false)
  const [touchRect, setTouchRect] = useState()
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const element = ref.current

    let touchCancelled = false

    const touchStarted = (event) => {
      if (event.touches.length > 1) return

      touchCancelled = false

      const touch = event.touches[0]
      const { clientX, clientY } = touch

      const rect = element.getBoundingClientRect()
      const point = { x: clientX - rect.left, y: clientY - rect.top }
      setPosition(point)

      const touchRect = {
        x: clientX - touch.radiusX,
        y: clientY - touch.radiusY,
        width: touch.radiusX * 2,
        height: touch.radiusY * 2,
      }
      setTouchRect(touchRect)
      setActiveEvent(event)
      setIsActive(true)

      event.stopPropagation()
    }

    const touchMoved = (event) => {
      if (touchCancelled || event.targetTouches.length !== 1) return
      setActiveEvent(event)

      const touch = event.targetTouches[0]

      const { clientX, clientY } = touch
      const rect = element.getBoundingClientRect()
      const point = { x: clientX - rect.left, y: clientY - rect.top }

      // check if touch is:
      // 1. cancelable. if it is not, then another gesture has started
      // 2. still inside target rect
      // if one of those conditions is not met, we hide the tooltip
      if (!event.cancelable || !pointInsideRect(point, rect)) {
        setIsActive(false)
        touchCancelled = true
      } else {
        setPosition(point)
        setIsActive(true)
      }
    }

    const touchEnded = (event) => {
      if (event.cancelable) {
        // prevent simulated click events
        event.preventDefault()
      }
      setActiveEvent(null)
      setIsActive(false)
      setPosition(null)
    }

    const mouseOver = (event) => {
      const { clientX, clientY } = event

      const rect = element.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      setPosition({ x, y })
      setActiveEvent(event)
      setIsActive(true)
    }

    const mouseMoved = (event) => {
      const { clientX, clientY } = event

      const rect = element.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      setActiveEvent(event)
      setPosition({ x, y })
      setCursorPosition({ x: clientX, y: clientY })
    }

    const mouseOut = () => {
      setPosition(null)
      setActiveEvent(null)
      setIsActive(false)
    }

    const pageScroll = () => {
      const elementsFromPoint = document.elementsFromPoint(
        cursorPosition.x,
        cursorPosition.y,
      )
      if (!elementsFromPoint.includes(element)) {
        setIsActive(false)
      } else {
        setIsActive(true)
      }
    }

    element.addEventListener("touchstart", touchStarted)
    element.addEventListener("touchmove", touchMoved)
    element.addEventListener("touchend", touchEnded)
    element.addEventListener("touchcancel", touchEnded)

    element.addEventListener("mouseover", mouseOver)
    element.addEventListener("mousemove", mouseMoved)
    element.addEventListener("mouseout", mouseOut)

    window.addEventListener("scroll", pageScroll)

    return () => {
      element.removeEventListener("touchstart", touchStarted)
      element.removeEventListener("touchmove", touchMoved)
      element.removeEventListener("touchend", mouseOut)
      element.removeEventListener("touchcancel", mouseOut)

      element.removeEventListener("mouseover", touchStarted)
      element.removeEventListener("mousemove", mouseMoved)
      element.removeEventListener("mouseout", mouseOut)

      window.removeEventListener("scroll", pageScroll)
    }
  }, [cursorPosition])

  return {
    touchOrHoverRef: ref,
    touchOrHoverIsActive: isActive,
    touchRect,
    positionInTarget: position,
    activeEvent,
  }
}
