import { IconPlus, IconMinus, IconReset } from "./icons"
import styles from "./style.module.css"

/**
 * @param {Object} props
 * @param {boolean} props.resetEnabled
 * @param {boolean} props.resetVisible
 * @param {(event: MouseEvent) => {}} props.onZoomIn
 * @param {(event: MouseEvent) => {}} props.onZoomOut
 * @param {(event: MouseEvent) => {}} props.onReset
 */
export function ZoomControl({
  resetEnabled,
  resetVisible,
  onZoomIn,
  onZoomOut,
  onReset,
}) {
  const _onZoomIn = (event) => {
    event.stopPropagation()
    onZoomIn(event)
  }

  const _onZoomOut = (event) => {
    event.stopPropagation()
    onZoomOut(event)
  }

  const _onReset = (event) => {
    event.stopPropagation()
    onReset(event)
  }

  return (
    <div className={styles.zoomControl}>
      <button
        className={styles.button}
        onClick={_onZoomIn}
        aria-label="zoom in"
      >
        <IconPlus />
      </button>
      <button
        className={styles.button}
        onClick={_onZoomOut}
        aria-label="zoom out"
      >
        <IconMinus />
      </button>
      <button
        className={styles.button}
        style={{ display: resetVisible ? "block" : "none" }}
        onClick={_onReset}
        disabled={!resetEnabled}
        aria-label="reset zoom"
      >
        <IconReset
          fill={
            resetEnabled ? "var(--primary-text-color)" : "var(--news-grey-03)"
          }
        />
      </button>
    </div>
  )
}
