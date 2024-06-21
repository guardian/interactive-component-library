import { useState, useEffect, useRef } from "preact/hooks"
import { forwardRef } from "preact/compat"
import { Map as _Map } from "./lib/Map"
import { View } from "./lib/View"
import styles from "./style.module.scss"

const mobileHelpText = "Use two fingers to zoom"

export const Map = forwardRef(({ config, onLoad, children }, ref) => {
  const { layers } = children

  const targetRef = useRef()

  const [map, setMap] = useState()
  const [zoomHelpText, setZoomHelpText] = useState("")
  const [showHelpText, setShowHelpText] = useState(false)

  useEffect(() => {
    const map = new _Map({
      view: new View(config.view),
      target: targetRef.current,
    })
    map.addLayers(layers)

    setMap(map)
    if (ref) ref.current = map

    onLoad && onLoad(map)

    const zoomHelpText = navigator.userAgent.indexOf("Mac") !== -1 ? "Use ⌘ + scroll to zoom" : "Use Ctrl + scroll to zoom"
    setZoomHelpText(zoomHelpText)

    return () => {
      map.destroy()
      if (ref) ref.current = null
      setMap(null)
    }
  }, [])

  useEffect(() => {
    if (!map) return
    let timeoutID

    map.onFilterEvent((showHelpText) => {
      if (timeoutID) clearTimeout(timeoutID)

      setShowHelpText(showHelpText)

      if (showHelpText) {
        timeoutID = setTimeout(() => {
          setShowHelpText(false)
        }, 1000)
      }
    })

    return () => {
      if (timeoutID) clearTimeout(timeoutID)
    }
  }, [map])

  useEffect(() => {
    if (map && layers !== map.layers) {
      map.setLayers(layers)
    }
  }, [map, layers])

  return (
    <div ref={targetRef} className={styles.mapContainer}>
      <div className={styles.helpTextContainer} style={{ opacity: showHelpText ? 1 : 0 }} aria-hidden>
        <p className={[styles.helpText, styles.desktopHelpText].join(" ")}>{zoomHelpText}</p>
        <p className={[styles.helpText, styles.mobileHelpText].join(" ")}>{mobileHelpText}</p>
      </div>
    </div>
  )
})
