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
      {/* Must use `class` not `className` — preact-transitioning v1.5+ clones
          this element with `class`, and Preact gives `className` priority when
          both are present, which silently drops the transition state classes. */}
      <div
        // eslint-disable-next-line react/no-unknown-property
        class={[
          styles.transitionContainer,
          blurBackground && styles.blur,
          visible && styles.visible,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={!inline ? onClick : undefined}
      >
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div ref={modalBoxRef} class={styles.modalBox}>
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
