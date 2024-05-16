import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.css'

export function CloseButton({ border = true, onClick, styles }) {
  styles = mergeStyles(defaultStyles, styles)
  return (
    <button className={[styles.button, border && styles.buttonBorder].join(' ')} onClick={onClick}>
      <svg className={styles.svg} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className={styles.path}
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.32497 10.025L15.5499 16.6499L16.6249 15.5749L10.025 8.32497L16.6249 1.075L15.5499 0L8.32497 6.62498L1.075 0.0249999L0 1.1L6.62498 8.32497L0 15.5499L1.075 16.6249L8.32497 10.025Z"
        />
      </svg>
    </button>
  )
}
