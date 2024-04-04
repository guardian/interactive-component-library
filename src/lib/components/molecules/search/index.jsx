import { useRef, useState } from 'preact/hooks'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import { SearchIcon } from './icons/search'
import defaultStyles from './style.module.css'

export function Search({ placeholder, inputValue, suggestions = [], onInputChange, onSubmit, onSelect, styles }) {
  styles = mergeStyles(defaultStyles, styles)

  // const [error, setError] = useState(null)
  const inputRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  function onKeyDown(event) {
    console.log('on key down', event.key)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setSelectedIndex((currentIndex) => Math.min(currentIndex + 1, suggestions.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setSelectedIndex((currentIndex) => Math.max(currentIndex - 1, -1))
    } else if (event.key === 'Enter' && selectedIndex >= 0) {
      event.preventDefault()
      onSelect(suggestions[selectedIndex])
    } else if (event.key === 'Enter') {
      onSubmit(inputRef.current.value)
    }
  }

  return (
    <div className={styles.searchContainer}>
      <input
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={inputValue}
        onFocus={(e) => {
          e.target.select()
          // setError(null)
        }}
        onKeyDown={onKeyDown}
        onInput={onInputChange}
        className={styles.input}
      />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      <SuggestionList
        suggestions={suggestions}
        highlightText={inputValue}
        selectedIndex={selectedIndex}
        styles={styles}
        onMouseOver={(_, index) => setSelectedIndex(index)}
        onSelect={onSelect}
      />
    </div>
  )
}

function SuggestionList({ suggestions, highlightText, selectedIndex, styles, onMouseOver, onSelect }) {
  if (suggestions.length === 0) return
  return (
    <ul className={styles.suggestions}>
      {suggestions.map((d, index) => {
        return (
          <li
            key={index}
            className={[styles.suggestion, index === selectedIndex && styles.selected].join(' ')}
            onMouseOver={() => onMouseOver(d, index)}
            onClick={() => onSelect(d)}
          >
            {d.text.split(new RegExp(`(${highlightText})`, 'ig')).map((part, i) =>
              i % 2 === 1 ? (
                <strong style={{ backgroundColor: '#ffe500', fontWeight: 400 }} key={i}>
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
          </li>
        )
      })}
    </ul>
  )
}
