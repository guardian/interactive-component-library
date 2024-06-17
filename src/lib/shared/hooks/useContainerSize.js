import { useLayoutEffect, useState } from "preact/hooks"

export function useContainerSize(containerRef) {
  const [containerSize, setContainerSize] = useState()

  useLayoutEffect(() => {
    const container = containerRef.current

    if (!container) return
    setContainerSize({ width: container.clientWidth, height: container.clientHeight })
  }, [containerRef])

  return containerSize
}
