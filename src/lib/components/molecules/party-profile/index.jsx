
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const PartyProfile = ({ styles, title, subtitle, blurb, imgSrc, abbreviation }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return(
    <div class={styles.container}>
        <>
        <div className={styles.leftCell}>
        <h3 className={`${styles.title} before-color--${abbreviation}`}>{title}</h3>
        <div className={styles.subtitle}>{subtitle}</div>
        <div className={styles.blurb}>{blurb}</div>
        </div>
        <div className={styles.rightCell}>
          <img  src={imgSrc} className={`${styles.mugshot} bg-color--${abbreviation}`}></img>
        </div>
        </>
    </div>)
}
