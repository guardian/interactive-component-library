import { useRef, useEffect, useState } from 'preact/hooks'

export function useTouchOrHover() {
  const ref = useRef()
  const [position, setPosition] = useState()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const element = ref.current

    const touchStarted = (event) => {
      if (event.touches.length > 1) return

      const touch = event.touches[0]
      const { clientX, clientY } = touch

      const rect = element.getBoundingClientRect()
      const point = { x: clientX - rect.left, y: clientY - rect.top }
      setPosition(point)
      setIsActive(true)
    }

    const touchMoved = (event) => {
      if (event.targetTouches.length !== 1) return

      const touch = event.targetTouches[0]
      const { clientX, clientY } = touch
      const rect = element.getBoundingClientRect()
      const point = { x: clientX - rect.left, y: clientY - rect.top }

      // check if touch is still inside target rect
      if (pointIsInsideRect(point, rect)) {
        setPosition(point)
        setIsActive(true)
      } else {
        setIsActive(false)
      }
    }

    const mouseOver = (event) => {
      const { clientX, clientY } = event

      const rect = element.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      setPosition({ x, y })
      setIsActive(true)
    }

    const mouseMoved = (event) => {
      const { clientX, clientY } = event

      const rect = element.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      setPosition({ x, y })
    }

    const touchOrHoverEnded = () => {
      setIsActive(false)
      setPosition(null)
    }

    element.addEventListener('touchstart', touchStarted)
    element.addEventListener('touchmove', touchMoved)
    element.addEventListener('touchend', touchOrHoverEnded)
    element.addEventListener('touchcancel', touchOrHoverEnded)

    element.addEventListener('mouseover', mouseOver)
    element.addEventListener('mousemove', mouseMoved)
    element.addEventListener('mouseout', touchOrHoverEnded)

    return () => {
      element.removeEventListener('touchstart', touchStarted)
      element.removeEventListener('touchmove', touchMoved)
      element.removeEventListener('touchend', touchOrHoverEnded)
      element.removeEventListener('touchcancel', touchOrHoverEnded)

      element.removeEventListener('mouseover', touchStarted)
      element.removeEventListener('mousemove', mouseMoved)
      element.removeEventListener('mouseout', touchOrHoverEnded)
    }
  }, [])

  return {
    touchOrHoverRef: ref,
    touchOrHoverIsActive: isActive,
    positionInTarget: position,
  }
}

function pointIsInsideRect(point, rect) {
  return point.x >= 0 && point.x <= rect.width && point.y >= 0 && point.y <= rect.height
}
