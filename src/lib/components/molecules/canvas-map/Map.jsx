import { useState, useEffect, useRef } from "preact/hooks"
import { forwardRef } from "preact/compat"
import { Map as _Map } from "./lib/Map"
import { View } from "./lib/View"
import styles from "./style.module.scss"

const mobileHelpText = "Use two fingers to zoom"

export const Map = forwardRef(
  ({ config, inModalState = false, onLoad, children }, ref) => {
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
      map.collaborativeGesturesEnabled = true
      setMap(map)

      let zoomHelpText = ""
      if (
        navigator.userAgentData?.mobile ||
        navigator.userAgent.indexOf("Mobile") !== -1
      ) {
        zoomHelpText = mobileHelpText
      } else {
        zoomHelpText =
          navigator.userAgent.indexOf("Mac") !== -1
            ? "Use ⌘ + scroll to zoom"
            : "Use Ctrl + scroll to zoom"
      }
      setZoomHelpText(zoomHelpText)

      return () => {
        map.destroy()
        setMap(null)
      }
    }, [config.view])

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
      if (map && onLoad) {
        onLoad(map)
      }

      if (map && ref) {
        ref.current = map
      }

      return () => {
        if (ref) {
          ref.current = null
        }
      }
    }, [map, ref, onLoad])

    useEffect(() => {
      if (map && layers !== map.layers) {
        map.setLayers(layers)
      }
    }, [map, layers])

    useEffect(() => {
      if (!map) return
      map.collaborativeGesturesEnabled = !inModalState
    }, [map, inModalState])

    return (
      <figure ref={targetRef} className={styles.mapContainer}>
        <div
          className={styles.helpTextContainer}
          style={{ opacity: showHelpText ? 1 : 0 }}
          aria-hidden
        >
          <p className={[styles.helpText, styles.desktopHelpText].join(" ")}>
            {zoomHelpText}
          </p>
          <p className={[styles.helpText, styles.mobileHelpText].join(" ")}>
            {mobileHelpText}
          </p>
        </div>
      </figure>
    )
  },
)
