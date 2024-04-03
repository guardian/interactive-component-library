import { useRef, useState } from 'preact/hooks'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import { SearchIcon } from './icons/search'
import defaultStyles from './style.module.css'

export function Search({ placeholder, inputValue, suggestions, styles }) {
  styles = mergeStyles(defaultStyles, styles)

  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={inputValue}
        onFocus={(e) => {
          e.target.select()
          setError(null)
        }}
        className={styles.input}
      />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  )
}
