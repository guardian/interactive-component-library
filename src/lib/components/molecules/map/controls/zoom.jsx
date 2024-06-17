import { IconPlus, IconMinus } from "./icons"
import styles from "./style.module.css"

export function ZoomControl({ onZoomIn, onZoomOut }) {
  return (
    <div className={styles.zoomControl}>
      <button className={styles.button} onClick={onZoomIn}>
        <IconPlus />
      </button>
      <button className={styles.button} onClick={onZoomOut}>
        <IconMinus />
      </button>
    </div>
  )
}
