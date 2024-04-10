import { InfoButton } from '$particles'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import defaultStyles from './style.module.scss'

export const ToplineResult = ({
  name,
  candidatename,
  mainNumber,
  secondaryNumber,
  styles,
  displayRow = false,
  abbreviation,
  onMouseOver,
  onInfoPress,
  showInfoButton = false,
  showCandidate = false
}) => {
  styles = mergeStyles({ ...defaultStyles }, styles)
  const displayStyle = displayRow ? styles.displayRow : styles.displayColumn

  return (
    !showCandidate ?
    <>    <div class={styles.toplineResult} onMouseOver={onMouseOver}>
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
    </>    :  <>
    <div class={styles.toplineResult} onMouseOver={onMouseOver}>
      <div class={styles.topRow}>
        <span class={`${styles.candidatename} before-color--${abbreviation}`}>{candidatename}</span>{' '}
        { showInfoButton &&
          <span class={styles.infoButton}>
            <InfoButton onClick={onInfoPress} />
          </span>
        }
        </div>
        <div class={styles.subhead}>
        <span class={styles.partyname}>{name}</span>{' '}
        </div>

      <div class={`${styles.displayNumbers} ${displayStyle}`}>
        <div class={styles.mainNumber}>{mainNumber}</div>
        <div class={styles.secondaryNumber}>{secondaryNumber}</div>
      </div>
    </div>
    </>
  )
}
