import { CSSTransition } from "preact-transitioning"
import { useCallback, useEffect, useRef } from "preact/hooks"
import { createPortal } from "preact/compat"
import styles from "./style.module.css"

export function Modal({ visible = false, children, onClickOutside }) {
  const modalBoxRef = useRef()
  const onClick = useCallback(
    (event) => {
      if (!modalBoxRef.current.contains(event.target)) {
        if (onClickOutside && visible) onClickOutside(event)
      }
    },
    [onClickOutside, visible],
  )

  useEffect(() => {
    if (visible) {
      window.addEventListener("scroll", onClick, { once: true })
    }
    return () => {
      if (visible) {
        window.removeEventListener("scroll", onClick)
      }
    }
  }, [onClick, visible])

  return createPortal(
    <CSSTransition in={visible} duration={300} classNames={styles}>
      <div class={styles.transitionContainer} onClick={onClick} style={{ pointerEvents: visible ? "auto" : "none" }}>
        <div ref={modalBoxRef} class={styles.modalBox}>
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body,
  )
}
