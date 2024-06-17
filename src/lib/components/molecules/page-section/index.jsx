import { forwardRef } from "preact/compat"
import { useLayoutEffect, useRef, useState } from "preact/hooks"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.scss"

export const SectionLayout = {
  default: "default",
  fullWidth: "fullWidth",
}

export const PageSection = forwardRef(({ children, layout = SectionLayout.default, styles, borderTop = false, backgroundColor = "transparent" }, ref) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  const [minHeight, setMinHeight] = useState("auto")
  const headerRef = useRef()

  useLayoutEffect(() => {
    const headerElement = headerRef.current
    setMinHeight(headerElement.offsetHeight)
  }, [children])

  return (
    <section ref={ref} className={[styles.section, styles[layout], borderTop && styles.borderTop].join(" ")} style={{ "--background-color": backgroundColor, minHeight }}>
      <div className={[styles.header, styles[layout]].join(" ")} ref={headerRef}>
        {children.header}
      </div>
      <div className={[styles.content, styles[layout]].join(" ")}>{children.content}</div>
    </section>
  )
})
