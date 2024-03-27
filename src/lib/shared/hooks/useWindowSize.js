import { useState, useEffect } from 'preact/hooks'

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window?.innerWidth || 0,
    height: window?.innerHeight || 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}

export { useWindowSize }
