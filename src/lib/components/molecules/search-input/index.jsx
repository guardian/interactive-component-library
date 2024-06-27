import { useRef, useState } from "preact/hooks"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import { SearchIcon } from "./icons/search"
import { CloseButton } from "$particles"
import defaultStyles from "./style.module.css"

export function SearchInput({ placeholder, inputValue, maxSuggestions = 5, onInputChange, onSubmit, onSelect, onClear, onFocus, styles }) {
  styles = mergeStyles(defaultStyles, styles)

  const inputRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState()
  const [showSuggestions, setShowSuggestions] = useState(true)

  async function updateSelectedIndex(diff) {
    setSelectedIndex((currentIndex) => {
      const newIndex = Math.max(Math.min(currentIndex + diff, suggestions.length - 1), -1)
      if (newIndex >= 0 && suggestions[newIndex].disabled) {
        return currentIndex
      }
      return newIndex
    })
  }

  async function onKeyDown(event) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      updateSelectedIndex(1)
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      updateSelectedIndex(-1)
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      event.preventDefault()
      onSelectSuggestion(suggestions[selectedIndex])
    } else if (event.key === "Enter") {
      event.preventDefault()
      if (onSubmit) {
        const shouldBlur = await onSubmit(inputRef.current.value)
        if (shouldBlur) {
          inputRef.current.blur()
        }
      }
    } else if (event.key === "Escape") {
      inputRef.current.blur()
    }
  }

  async function inputChanged(input) {
    let suggestions = await onInputChange(input)
    if (suggestions) {
      suggestions = suggestions.slice(0, maxSuggestions)
    }
    setSuggestions(suggestions)
    setSelectedIndex(-1)
  }

  function onSelectSuggestion(suggestion) {
    onSelect(suggestion)
    inputRef.current.value = suggestion.text
    inputRef.current.blur()
  }

  const showClearButton = (inputRef.current?.value && inputRef.current?.value !== "") || (inputValue && inputValue !== "")

  return (
    <div className={styles.searchContainer}>
      <input
        name="search"
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        aria-label="Search input"
        value={inputValue}
        onKeyDown={onKeyDown}
        onInput={(e) => {
          inputChanged(e.target.value)
        }}
        onBlur={() => {
          setShowSuggestions(false)
        }}
        onFocus={(e) => {
          e.target.select()
          setShowSuggestions(true)

          onFocus && onFocus(e)
        }}
        className={styles.input}
      />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
      {showClearButton && (
        <div className={styles.clearButton}>
          <CloseButton
            border={false}
            onClick={() => {
              const emptyValue = ""
              inputRef.current.value = emptyValue
              inputChanged(emptyValue)
              inputRef.current.focus()

              onClear()
            }}
          />
        </div>
      )}
      {showSuggestions && (
        <SuggestionList
          suggestions={suggestions}
          highlightText={inputRef.current?.value}
          selectedIndex={selectedIndex}
          styles={styles}
          onMouseOver={(_, index) => setSelectedIndex(index)}
          onSelect={onSelectSuggestion}
        />
      )}
    </div>
  )
}

function SuggestionList({ suggestions, highlightText, selectedIndex, styles, onMouseOver, onSelect }) {
  if (!suggestions || suggestions.length === 0) return
  return (
    <ul className={styles.suggestions} aria-label="Search suggestions">
      {suggestions.map((d, index) => {
        const shouldHighlight = !d.disabled
        return (
          <li
            key={index}
            aria-label={d.text}
            className={[styles.suggestion, index === selectedIndex && styles.selected, d.disabled && styles.disabled].join(" ")}
            onMouseDown={(e) => e.preventDefault()}
            onMouseOver={() => onMouseOver(d, index)}
            onClick={() => {
              onSelect(d)
            }}
          >
            {shouldHighlight &&
              d.text.split(new RegExp(`(${highlightText})`, "ig")).map((part, i) =>
                i % 2 === 1 ? (
                  <span className={styles.highlighted} key={i}>
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            {!shouldHighlight && d.text}
          </li>
        )
      })}
    </ul>
  )
}
