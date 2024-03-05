import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function Container({ children, sideBorders = false, styles }) {
  const { container, sideBorders: sideBordersStyle } = mergeStyles(defaultStyles, styles)

  return <div className={[container, sideBorders && sideBordersStyle].join(' ')}>{children}</div>
}
