import { GradientIcon, CircleIcon } from "$particles"
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const ControlChange = ({ previous, next, text, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  let changeIcon

  if (previous && next && next !== previous) {
    changeIcon = (
      <GradientIcon
        previous={previous}
        next={next}
        styles={{ previous: styles.previous, next: styles.next }}
      />
    )
  } else if (next) {
    changeIcon = <CircleIcon styles={{ circle: `fill-color--${next}` }} />
  }

  return (
    <div className={styles.container}>
      {changeIcon && <>{changeIcon}</>}
      <strong className={styles.text}>{text}</strong>
    </div>
  )
}
