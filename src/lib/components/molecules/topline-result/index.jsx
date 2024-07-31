import { InfoButton } from "$particles"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import { forwardRef } from "preact/compat"
import defaultStyles from "./style.module.scss"

export const ToplineResult = forwardRef(
  (
    {
      name,
      secondaryName,
      mainNumber,
      mainNumberSuffix,
      secondaryNumber,
      styles,
      displayRow = false,
      abbreviation,
      onMouseOver,
      onInfoPress,
      showInfoButton = false,
      infoButtonRef,
    },
    ref,
  ) => {
    styles = mergeStyles({ ...defaultStyles }, styles)
    const displayStyle = displayRow ? styles.displayRow : styles.displayColumn

    return (
      <div className={styles.toplineResult} onMouseOver={onMouseOver} ref={ref}>
        <div className={styles.topRow}>
          <span
            className={`${styles.primaryname} before-color--${abbreviation}`}
          >
            {name}
          </span>
          {showInfoButton && (
            <span className={styles.infoButton}>
              <InfoButton onClick={onInfoPress} ref={infoButtonRef} />
            </span>
          )}
        </div>
        {secondaryName && (
          <div className={styles.subhead}>
            <span className={styles.secondaryname}>{secondaryName}</span>
          </div>
        )}
        <div className={`${styles.displayNumbers} ${displayStyle}`}>
          <div className={styles.mainNumber}>
            {mainNumber}
            {mainNumberSuffix && (
              <span className={styles.mainNumberSuffix}>
                {mainNumberSuffix}
              </span>
            )}
          </div>
          <div className={styles.secondaryNumber}>{secondaryNumber}</div>
        </div>
      </div>
    )
  },
)
