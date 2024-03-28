import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function ArrowButton({ direction = 'right', disabled = false, styles, onClick }) {
  styles = mergeStyles(defaultStyles, styles)

  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      <svg className={[styles.icon, direction].join(' ')} viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
        <circle cx={14} cy={14} r="13" fill-rule="nonzero" />
        <g transform="translate(6 7)">
          <path
            d="M0.667319 7.63692L12.8497 7.63692L8.07231 13.3539L8.69338 13.975L15.334 7.31842L15.334 6.68143L8.69338 0.0249018L8.07231 0.645966L12.8497 6.36294L0.667319 6.36294L0.667319 7.63692Z"
            fill="#121212"
          />
        </g>
      </svg>
    </button>
  )
}
