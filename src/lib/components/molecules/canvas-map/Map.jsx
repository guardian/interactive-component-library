import { useState, useEffect, useRef } from "preact/hooks"
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
 *    mapRef?: import('preact').Ref<Map>,
 *    allowZoomPan?: boolean,
 * }} MapComponentProps
 */

const Component = (
  /** @type {MapComponentProps} */ {
    config,
    inModalState = false,
    onLoad,
    children,
    mapRef,
    allowZoomPan = true,
  },
) => {
  const targetRef = useRef()

  const [map, setMap] = useState(/** @type {Map | null} */ (null))
  const [zoomHelpText, setZoomHelpText] = useState("")
  const [showHelpText, setShowHelpText] = useState(false)

  useEffect(() => {
    if (!targetRef.current) return
    config.allowZoomPan = allowZoomPan

    const map = new Map({
      ...config,
      target: targetRef.current,
    })

    if (allowZoomPan) map.collaborativeGesturesEnabled(true)

    setMap(map)

    if (mapRef) {
      // @ts-ignore
      mapRef.current = map
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

      if (mapRef) {
        // @ts-ignore
        mapRef.current = null
      }
    }
  }, [config, onLoad, mapRef, allowZoomPan])

  useEffect(() => {
    if (!map || !allowZoomPan) return
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
  }, [map, allowZoomPan])

  useEffect(() => {
    if (!map || !allowZoomPan) return

    map.collaborativeGesturesEnabled(!inModalState)
  }, [map, inModalState, allowZoomPan])

  return (
    <figure ref={targetRef} className={styles.mapContainer}>
      {allowZoomPan && (
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
      )}
      <MapProvider map={map}>{children}</MapProvider>
    </figure>
  )
}

// NOTE: we declare Component separately so the component has a "display name"
Map.Component = Component
