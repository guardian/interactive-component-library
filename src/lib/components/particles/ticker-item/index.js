import styles from './style.module.css'

export function TickerItem({ children }) {
  return <div class={styles.container}>{children}</div>
}
