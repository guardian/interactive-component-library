import { useEffect, useState } from 'preact/hooks'

export const useMousePosition = (elementRef) => {
  const [position, setPosition] = useState(null)

  const onMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    requestAnimationFrame(() => setPosition({ x, y }))
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
