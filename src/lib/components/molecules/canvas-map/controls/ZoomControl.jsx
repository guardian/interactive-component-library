import { IconPlus, IconMinus, IconReset } from "./icons"
import styles from "./style.module.css"

export function ZoomControl({ resetEnabled, onZoomIn, onZoomOut, onReset }) {
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
      <button className={styles.button} onClick={_onZoomIn}>
        <IconPlus />
      </button>
      <button className={styles.button} onClick={_onZoomOut}>
        <IconMinus />
      </button>
      <button className={styles.button} onClick={_onReset} disabled={!resetEnabled}>
        <IconReset fill={resetEnabled ? "var(--primary-text-color)" : "var(--news-grey-02)"} />
      </button>
    </div>
  )
}
