import styles from "./style.module.scss"

export function Gradient() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g className={styles.gradient}>
        <rect fill="url(#paint0_linear_3798_6653)" />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_3798_6653"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop className={styles.firstStop} />
          <stop className={styles.lastStop} offset="1" />
        </linearGradient>
      </defs>
    </svg>
  )
}
