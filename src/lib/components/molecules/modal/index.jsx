import { useCallback, useEffect, useRef } from "preact/hooks"
import { CSSTransition } from "preact-transitioning"
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export function Modal({
  visible = false,
  blurBackground = true,
  alwaysMounted = false,
  styles,
  children,
  onClickOutside,
}) {
  styles = mergeStyles(defaultStyles, styles)
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

  return (
    <CSSTransition
      in={visible}
      duration={300}
      classNames={styles}
      alwaysMounted={alwaysMounted}
    >
      <div
        className={[
          styles.transitionContainer,
          blurBackground && styles.blur,
          visible && styles.visible,
        ].join(" ")}
        onClick={onClick}
      >
        <div ref={modalBoxRef} className={styles.modalBox}>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
