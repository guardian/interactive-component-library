import { InfoButton } from '$particles'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.scss'

export const ToplineResult = ({
  name,
  mainNumber,
  secondaryNumber,
  styles,
  displayRow = false,
  abbreviation,
  onMouseOver,
  onInfoPress,
  showInfoButton = false,
}) => {
  styles = mergeStyles({ ...defaultStyles }, styles)
  const displayStyle = displayRow ? styles.displayRow : styles.displayColumn

  return (
    <div class={styles.toplineResult} onMouseOver={onMouseOver}>
      <div class={styles.topRow}>
        <span class={`${styles.name} before-color--${abbreviation}`}>{name}</span>{' '}
        { showInfoButton &&
          <span class={styles.infoButton}>
            <InfoButton onClick={onInfoPress} />
          </span>
        }
        </div>
      <div class={`${styles.displayNumbers} ${displayStyle}`}>
        <div class={styles.mainNumber}>{mainNumber}</div>
        <div class={styles.secondaryNumber}>{secondaryNumber}</div>
      </div>
    </div>
  )
}
