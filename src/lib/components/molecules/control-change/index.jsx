import { GradientIcon, CircleIcon } from '$particles'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const ControlChange = ({ previous, next, text, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  let hasChanged = next !== previous

  return (
    <div class={styles.container}>
      <>
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
          <CircleIcon styles={{ circle: styles.next || `fill-color--${next}` }} />
        )}
        <strong className={styles.text}>{text}</strong>
      </>
    </div>
  )
}
