import { useWindowSize } from './useWindowSize'
import { useLayoutEffect, useState } from 'preact/hooks'

export function useContainerSize(containerRef) {
  const windowSize = useWindowSize()
  const [containerSize, setContainerSize] = useState()

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    setContainerSize({ width: container.clientWidth, height: container.clientHeight })
  }, [containerRef, windowSize])

  return containerSize
}
