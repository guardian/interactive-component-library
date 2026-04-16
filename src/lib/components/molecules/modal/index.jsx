import { useCallback, useEffect, useRef } from "preact/hooks"
import { CSSTransition } from "preact-transitioning"
import defaultStyles from "./style.module.css"
import inlineStyles from "./style.inline.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export function Modal({
  visible = false,
  blurBackground = true,
  inline = false,
  alwaysMounted = false,
  styles,
  children,
  onClickOutside,
}) {
  const baseStyles = inline ? inlineStyles : defaultStyles
  styles = mergeStyles(baseStyles, styles)
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
    if (visible && !inline) {
      window.addEventListener("scroll", onClick, { once: true })
    }
    return () => {
      if (visible && !inline) {
        window.removeEventListener("scroll", onClick)
      }
    }
  }, [onClick, visible, inline])

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
        onClick={!inline ? onClick : undefined}
      >
        <div ref={modalBoxRef} className={styles.modalBox}>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
