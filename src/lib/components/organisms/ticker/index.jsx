import styles from './style.module.css'

export function Ticker({ children }) {
  return <div class={styles.ticker}>{children}</div>
}
