import { useEffect, useState } from 'preact/hooks'

export const useTooltipTarget = (targetElement, trackPosition) => {
  const [targetRect, setTargetRect] = useState()
  const [position, setPosition] = useState(null)
  const [hoverActive, setHoverActive] = useState(false)

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
    setTargetRect(targetElement.getBoundingClientRect())

    if (trackPosition) {
      targetElement.addEventListener('mousemove', onMouseMove)
      targetElement.addEventListener('mouseout', onMouseOut)
    }

    return () => {
      if (trackPosition) {
        targetElement.removeEventListener('mousemove', onMouseMove)
        targetElement.removeEventListener('mouseout', onMouseOut)
      }
    }
  }, [targetElement, trackPosition])

  return {
    targetRect,
    positionInTarget: position,
    hoverActive,
  }
}
