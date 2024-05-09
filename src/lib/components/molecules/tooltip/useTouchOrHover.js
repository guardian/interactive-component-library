import { useRef, useEffect, useState } from 'preact/hooks'

export function useTouchOrHover() {
  const ref = useRef()
  const [position, setPosition] = useState()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const touchOrHoverStarted = (event) => {
      console.log("touch or hover start", event)
      setIsActive(true)
    }

    const touchOrHoverEnded = (event) => {
      console.log('touch or hover end', event)
      setIsActive(false)
    }

    const element = ref.current
    element.addEventListener('touchstart', touchOrHoverStarted)
    element.addEventListener('touchend', touchOrHoverEnded)
    element.addEventListener('touchcancel', touchOrHoverEnded)

    element.addEventListener('mouseover', touchOrHoverStarted)
    element.addEventListener('mouseout', touchOrHoverEnded)

    return () => {
      element.removeEventListener("touchstart", touchOrHoverStarted)
      element.removeEventListener('touchend', touchOrHoverEnded)
      element.removeEventListener('touchcancel', touchOrHoverEnded)

      element.removeEventListener('mouseover', touchOrHoverStarted)
      element.removeEventListener('mouseout', touchOrHoverEnded)
    }
  }, [])

  return {
    touchOrHoverRef: ref,
    touchOrHoverIsActive: isActive,
    position,
  }
}