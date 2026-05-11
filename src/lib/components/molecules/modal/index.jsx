import { useCallback, useEffect, useRef } from "preact/hooks"
import { CSSTransition } from "preact-transitioning"
import defaultStyles from "./style.module.css"
import inlineStyles from "./style.inline.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

const focusableSelectors =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function Modal({
  visible = false,
  blurBackground = true,
  inline = false,
  alwaysMounted = false,
  label,
  labelledBy,
  styles,
  children,
  onClickOutside,
}) {
  const baseStyles = inline ? inlineStyles : defaultStyles
  styles = mergeStyles(baseStyles, styles)
  const modalBoxRef = useRef()
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (visible) {
      previousFocusRef.current = document.activeElement
      const focusable = modalBoxRef.current?.querySelector(focusableSelectors)
      focusable?.focus()
    } else if (!inline) {
      previousFocusRef.current?.focus()
    }
  }, [visible, inline])

  useEffect(() => {
    // Handle basic keyboard navigation and focus management for modals.
    // See https://adrianroselli.com/2025/06/where-to-put-focus-when-opening-a-modal-dialog.html.
    function onKeyDown(e) {
      if (!visible) return

      if (e.key === "Escape") {
        if (onClickOutside) onClickOutside(e)
        return
      }

      if (e.key === "Tab") {
        const focusables = Array.from(
          modalBoxRef.current?.querySelectorAll(focusableSelectors) ?? [],
        )

        if (!focusables.length) {
          e.preventDefault()
          return
        }

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [visible, onClickOutside])

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
        {}
        <div
          ref={modalBoxRef}
          // eslint-disable-next-line react/no-unknown-property
          class={styles.modalBox}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          aria-labelledby={labelledBy}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}
