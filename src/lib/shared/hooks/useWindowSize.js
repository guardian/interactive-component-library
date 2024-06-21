import { useState, useLayoutEffect } from "preact/hooks"

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === "undefined") return { width: 0, height: 0 }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  useLayoutEffect(() => {
    if (typeof window === "undefined") return

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}

export { useWindowSize }
