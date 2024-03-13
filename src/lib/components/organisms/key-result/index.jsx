import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const KeyResult = ({
  locator,
  bodyCopy,
  headerCopy,
  subHeader,
  chart,
  styles
}) => {

  styles = mergeStyles({...defaultStyles}, styles)

  return (
    <div class={styles.keyResults}>
      <div class={styles.header}>
        <div>
          <div class={styles.headerText} dangerouslySetInnerHTML={{ __html: headerCopy }} />
          {subHeader}
        </div>
        <div class={styles.locatorContainer}>{locator}</div>
      </div>
      <div class={styles.body}>
        <div class={styles.bodyText}>{bodyCopy}</div>
        {chart}
      </div>
    </div>
  )
}