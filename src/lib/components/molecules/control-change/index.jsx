import { GradientIcon } from '$particles'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const ControlChange = ({ previous, next, text, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <div class="gv-control-change">
      <GradientIcon
        previousStopColor={previous.color}
        nextStopColor={next.color}
        previousAbbreviation={previous.abbreviation}
        nextAbbreviation={next.abbreviation}
      />
      <strong className={styles.text}>{text}</strong>
    </div>
  )
}
