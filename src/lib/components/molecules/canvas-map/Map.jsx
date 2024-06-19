import { useState, useEffect, useRef } from "preact/hooks"
import { forwardRef } from "preact/compat"
import { Map as _Map } from "./lib/Map"
import { View } from "./lib/View"
import styles from "./style.module.scss"

export const Map = forwardRef(({ config, onLoad, children }, ref) => {
  const { layers } = children

  const [map, setMap] = useState()
  const [hideDefaultHelpText, setHideDefaultHelpText] = useState(false)
  const [zoomHelpText, setZoomHelpText] = useState("")
  const [highlightHelpText, setHighlightHelpText] = useState(false)

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
      if (ref) ref.current = null
      setMap(null)
    }
  }, [])

  useEffect(() => {
    if (!map) return
    let timeoutID

    map.onFilterEvent(() => {
      if (timeoutID) clearTimeout(timeoutID)
      setHighlightHelpText(true)
      timeoutID = setTimeout(() => {
        setHighlightHelpText()
      }, 1000)
    })

    map.onZoomEvent((zoomLevel) => {
      setHideDefaultHelpText(zoomLevel > 1)
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

  const targetRef = useRef()

  const hideHelpText = hideDefaultHelpText && !highlightHelpText
  const helpText = highlightHelpText ? zoomHelpText : config.defaultHelpText

  return (
    <div ref={targetRef} className={styles.mapContainer}>
      <div className={styles.helpTextContainer} style={{ opacity: hideHelpText ? 0 : 1 }} aria-hidden>
        <p className={[styles.helpText, highlightHelpText && styles.highlight].join(" ")}>{helpText}</p>
      </div>
    </div>
  )
})
