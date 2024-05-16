import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function Container({ children, sideBorders = false, styles }) {
  const { pageContainer, sideBorders: sideBordersStyle } = mergeStyles(defaultStyles, styles)

  return <div className={[pageContainer, sideBorders && sideBordersStyle].join(' ')}>{children}</div>
}
