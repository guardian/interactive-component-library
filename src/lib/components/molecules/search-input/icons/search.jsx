import styles from './search.module.css'

export function SearchIcon() {
  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
      <path
        className={styles.path}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.273 0c4.022 0 7.25 3.295 7.25 7.273a7.226 7.226 0 01-7.25 7.25C3.25 14.523 0 11.295 0 7.273 0 3.295 3.25 0 7.273 0zm0 1.84A5.403 5.403 0 001.84 7.274c0 3 2.409 5.454 5.432 5.454 3 0 5.454-2.454 5.454-5.454 0-3.023-2.454-5.432-5.454-5.432zM20 18.16l-5.432-5.432h-.932l-.909.91v.931L18.16 20 20 18.159z"
      />
    </svg>
  )
}
