import { CSSTransition } from 'preact-transitioning'
import styles from './style.module.css'

export function Modal({ visible = false, children }) {
  return (
    <CSSTransition in={visible} duration={300} classNames={styles} alwaysMounted>
      <div class={styles.transitionContainer}>
        <div class={styles.modalBox}>{children}</div>
      </div>
    </CSSTransition>
  )
}
