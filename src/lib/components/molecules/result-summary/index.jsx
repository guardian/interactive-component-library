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
  styles,
}) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  if (isSlim) {
    let hasChanged = next !== previous

    return (
      <div
        className={`${styles.container} ${styles.containerSlim}`}
        onClick={onClick}
      >
        {hasChanged ? (
          <GradientIcon
            previous={previous}
            next={next}
            styles={{
              previous: styles.previous,
              next: styles.next,
            }}
          />
        ) : (
          <CircleIcon styles={{ circle: `fill-color--${next}` }} />
        )}
        <p className={styles.titleSlim}>{title} </p>
        <RelativeTimeSentence timeStamp={timestamp} styles={styles} />
      </div>
    )
  } else {
    return (
      <div className={styles.container}>
        <ControlChange previous={previous} next={next} text={title} />
        <p className={styles.paragraph}>{text}</p>
        <RelativeTimeSentence timeStamp={timestamp} />
      </div>
    )
  }
}
