import { useCallback, useEffect, useRef } from "preact/hooks"
import { createPortal } from "preact/compat"
import { CSSTransition } from "preact-transitioning"
import styles from "./style.module.css"

export function Modal({ visible = false, blurBackground = true, children, onClickOutside }) {
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

  if (typeof document === "undefined") return

  return createPortal(
    <CSSTransition in={visible} duration={300} classNames={styles}>
      <div className={[styles.transitionContainer, blurBackground && styles.blur, visible && styles.visible].join(" ")} onClick={onClick}>
        <div ref={modalBoxRef} class={styles.modalBox}>
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body,
  )
}
