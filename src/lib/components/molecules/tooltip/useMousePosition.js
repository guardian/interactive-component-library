import { useEffect, useState } from 'preact/hooks'

export const useMousePosition = (elementRef) => {
  const [position, setPosition] = useState(null)

  const onMouseMove = ({ offsetX, offsetY }) => {
    requestAnimationFrame(() => setPosition({ x: offsetX, y: offsetY }))
  }

  const onMouseOut = () => {
    requestAnimationFrame(() => setPosition(null))
  }

  useEffect(() => {
    const currentRef = elementRef.current
    currentRef.addEventListener('mousemove', onMouseMove)
    currentRef.addEventListener('mouseout', onMouseOut)

    return () => {
      currentRef.removeEventListener('mousemove', onMouseMove)
      currentRef.removeEventListener('mouseout', onMouseOut)
    }
  }, [elementRef])

  return position
}
