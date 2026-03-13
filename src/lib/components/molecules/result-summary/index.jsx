import { ControlChange } from "$molecules"
import { RelativeTimeSentence, GradientIcon, CircleIcon } from "$particles"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.css"

export function ResultSummary({
  previous,
  next,
  title,
  text,
  timestamp,
  onClick,
  isSlim = false,
  lineClamp = false,
  styles,
}) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  if (isSlim) {
    let changeIcon

    // TODO: we're duplicating code between here and ControlChange, do we need this?
    if (previous && next && next !== previous) {
      changeIcon = (
        <GradientIcon
          previous={previous}
          next={next}
          styles={{ previous: styles.previous, next: styles.next }}
        />
      )
    } else if (next && !previous) {
      changeIcon = <CircleIcon styles={{ circle: `fill-color--${next}` }} />
    }

    return (
      <div
        className={`${styles.container} ${styles.containerSlim}`}
        onClick={onClick}
      >
        <p className={`${styles.titleSlim} ${lineClamp && styles.lineClamp}`}>
          {changeIcon && <>{changeIcon} </>}
          {title} <RelativeTimeSentence timeStamp={timestamp} />
        </p>
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <ControlChange previous={previous} next={next} text={title} />
        <p className={`${styles.paragraph} ${lineClamp && styles.lineClamp}`}>
          {text}
        </p>
        <RelativeTimeSentence timeStamp={timestamp} />
      </div>
    )
  }
}
