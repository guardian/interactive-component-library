import { useLayoutEffect, useState } from "preact/hooks"

export function useContainerSize(containerRef) {
  const [containerSize, setContainerSize] = useState()

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
          left: entry.contentRect.left,
          right: entry.contentRect.right,
          bottom: entry.contentRect.bottom,
          top: entry.contentRect.top,
        })
      }
    })

    observer.observe(container)

    return () => {
      observer.disconnect()
    }
  }, [containerRef])

  return containerSize
}
