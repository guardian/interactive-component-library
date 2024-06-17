import { InfoButton } from "$particles"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import { forwardRef } from "preact/compat"
import defaultStyles from "./style.module.scss"

export const ToplineResult = forwardRef(
  ({ name, secondaryName, mainNumber, mainNumberSuffix, secondaryNumber, styles, displayRow = false, abbreviation, onMouseOver, onInfoPress, showInfoButton = false, infoButtonRef }, ref) => {
    styles = mergeStyles({ ...defaultStyles }, styles)
    const displayStyle = displayRow ? styles.displayRow : styles.displayColumn

    return (
      <div class={styles.toplineResult} onMouseOver={onMouseOver} ref={ref}>
        <div class={styles.topRow}>
          <span class={`${styles.primaryname} before-color--${abbreviation}`}>{name}</span>
          {showInfoButton && (
            <span class={styles.infoButton}>
              <InfoButton onClick={onInfoPress} ref={infoButtonRef} />
            </span>
          )}
        </div>
        {secondaryName && (
          <div class={styles.subhead}>
            <span class={styles.secondaryname}>{secondaryName}</span>
          </div>
        )}
        <div class={`${styles.displayNumbers} ${displayStyle}`}>
          <div class={styles.mainNumber}>
            {mainNumber}
            {mainNumberSuffix && <span className={styles.mainNumberSuffix}>{mainNumberSuffix}</span>}
          </div>
          <div class={styles.secondaryNumber}>{secondaryNumber}</div>
        </div>
      </div>
    )
  },
)
