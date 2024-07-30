import { ControlChange } from "$molecules"
import { RelativeTimeSentence } from "$particles"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.css"

export function ResultSummary({
  previous,
  next,
  title,
  text,
  timestamp,
  styles,
}) {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <div class={styles.container}>
      <ControlChange previous={previous} next={next} text={title} />
      <p className={styles.paragraph}>{text}</p>
      <RelativeTimeSentence timeStamp={timestamp} />
    </div>
  )
}
