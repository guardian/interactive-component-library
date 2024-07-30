import { toChildArray } from "preact"
import defaultStyles from "./style.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const GridType = {
  small: "small",
  medium: "medium",
  large: "large",
}

export function ResponsiveGrid({ type = GridType.medium, children, styles }) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <div className={styles.grid} data-grid-type={type}>
      {toChildArray(children).map((child, index) => {
        return (
          <div key={index} className={styles.gridItem}>
            {child}
          </div>
        )
      })}
    </div>
  )
}
