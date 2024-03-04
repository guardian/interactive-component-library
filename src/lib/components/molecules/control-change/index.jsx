
import { GradientIcon, CircleIcon } from '$particles'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const ControlChange = ({ previous, next, text, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  let hasChanged = next.abbreviation !== previous.abbreviation;

  return(
    <div class={styles.container}>
          <>
            { 
              hasChanged 
              ?
              <GradientIcon
                previousStopColor={previous.color}
                nextStopColor={next.color}
                />
              :
              <CircleIcon color={next.color} />
            }
            <strong className={styles.text}>{text}</strong>
          </>
    </div>)
}
