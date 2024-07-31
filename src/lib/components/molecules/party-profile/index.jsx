import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

const SubtitleStyle = {
  small: "small",
  large: "large",
}

export const PartyProfile = ({
  title,
  subtitle,
  subtitleStyle = SubtitleStyle.large,
  blurb,
  footnote,
  imgSrc,
  imgAltText,
  styles,
}) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  return (
    <div className={styles.container}>
      <img src={imgSrc} className={styles.img} alt={imgAltText} />
      <h3 className={styles.title}>{title}</h3>
      <div className={[styles.subtitle, styles[subtitleStyle]].join(" ")}>
        {subtitle}
      </div>
      <div className={styles.blurb}>{blurb}</div>
      <div className={styles.footnote}>{footnote}</div>
    </div>
  )
}
