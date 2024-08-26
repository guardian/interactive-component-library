import { useState, useEffect, useRef } from "preact/hooks"
import { forwardRef } from "preact/compat"
import { Map } from "./lib/Map"
import { MapProvider } from "./context/MapContext"
// @ts-ignore
import styles from "./style.module.scss"

const mobileHelpText = "Use two fingers to zoom"

/**
 * @typedef {{
 *    config: Object,
 *    inModalState?: boolean,
 *    onLoad?: (map: Map) => void,
 *    children: import('preact').ComponentChildren,
 * }} MapComponentProps
 */

Map.Component = forwardRef(
  (
    /** @type {MapComponentProps} */ {
      config,
      inModalState = false,
      onLoad,
      children,
    },
    ref,
  ) => {
    const targetRef = useRef()

    const [map, setMap] = useState(/** @type {Map | null} */ (null))
    const [zoomHelpText, setZoomHelpText] = useState("")
    const [showHelpText, setShowHelpText] = useState(false)

    useEffect(() => {
      if (!targetRef.current) return

      const map = new Map({
        ...config,
        target: targetRef.current,
      })

      map.collaborativeGesturesEnabled(true)
      setMap(map)

      if (ref) {
        // @ts-ignore
        ref.current = map
      }

      if (onLoad) {
        onLoad(map)
      }

      let zoomHelpText = ""
      if (
        // @ts-ignore
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

        if (ref) {
          // @ts-ignore
          ref.current = null
        }
      }
    }, [config, onLoad, ref])

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
      if (!map) return
      map.collaborativeGesturesEnabled(!inModalState)
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
        <MapProvider map={map}>{children}</MapProvider>
      </figure>
    )
  },
)
