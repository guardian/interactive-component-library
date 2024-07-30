import { useId } from "preact/hooks"
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const GradientIcon = (props) => {
  let { previous, next, styles } = props
  styles = mergeStyles(defaultStyles, styles)

  const gradientId = useId()

  return (
    <svg
      class={styles.svg}
      width="24"
      height="11"
      viewBox="0 0 24 11"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="5.5"
          y1="5.5"
          x2="12"
          y2="5.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop class={`${styles?.previous} stop-color--${previous}`} />
          <stop class={`${styles?.next} stop-color--${next}`} offset="1" />
        </linearGradient>
      </defs>
      <path
        d="M0 5.434C0 2.43288 2.43288 0 5.434 0H5.69626C6.85818 0 7.9797 0.426401 8.84813 1.19834C10.6456 2.79612 13.3544 2.79612 15.1519 1.19834C16.0203 0.426401 17.1418 0 18.3037 0L18.566 0C21.5671 0 24 2.43288 24 5.434V5.566C24 8.56712 21.5671 11 18.566 11H18.3037C17.1418 11 16.0203 10.5736 15.1519 9.80166C13.3544 8.20388 10.6456 8.20388 8.84813 9.80166C7.9797 10.5736 6.85818 11 5.69626 11H5.434C2.43288 11 0 8.56712 0 5.566V5.434Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}
