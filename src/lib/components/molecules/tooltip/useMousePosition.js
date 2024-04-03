import { useEffect, useState } from 'preact/hooks'

export const useMousePosition = (element) => {
  const [hoverActive, setHoverActive] = useState(false)
  const [position, setPosition] = useState(null)

  const onMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top
    requestAnimationFrame(() => {
      setPosition({ x, y })
      setHoverActive(true)
    })
  }

  const onMouseOut = () => {
    requestAnimationFrame(() => {
      setHoverActive(false)
    })
  }

  useEffect(() => {
    if (element) {
      element.addEventListener('mousemove', onMouseMove)
      element.addEventListener('mouseout', onMouseOut)
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', onMouseMove)
        element.removeEventListener('mouseout', onMouseOut)
      }
    }
  }, [element])

  return [position, hoverActive]
}
