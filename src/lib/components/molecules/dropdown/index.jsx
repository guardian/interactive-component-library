import { useState, useCallback, useMemo } from "preact/hooks"
import { Chevron } from "$particles"
import styles from "./style.module.css"

export function Dropdown({ title, hint, options, onSelect, collapseOnSelect = false }) {
  const [expanded, setExpanded] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onOptionClick = useCallback(
    (option, index) => {
      setSelectedIndex(index)
      if (onSelect) onSelect(option, index)
      if (collapseOnSelect) setExpanded(false)
    },
    [onSelect],
  )

  const iconForSelectedOption = useMemo(() => {
    const selectedOption = options[selectedIndex]
    return selectedOption.icon
  }, [options, selectedIndex])

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setExpanded((current) => !current)}>
        <img src={iconForSelectedOption} className={styles.icon} />
        <span className={styles.title}>{title}</span>
        <Chevron active={true} size="large" direction={expanded ? "up" : "down"} />
      </button>

      <div className={styles.popout} style={{ visibility: expanded ? "visible" : "hidden" }}>
        {hint && <p className={styles.hint}>{hint}</p>}
        {options.map((option, index) => (
          <button key={option.title} className={styles.option} onClick={() => onOptionClick(option, index)}>
            <img src={option.icon} className={styles.optionIcon} />
            <div className={styles.optionText}>
              <h4 className={styles.optionTitle}>{option.title}</h4>
              <p className={styles.optionDescription}>{option.description}</p>
            </div>
            {index === selectedIndex && (
              <div className={styles.checkmark}>
                <Checkmark />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Checkmark() {
  return (
    <svg width="11" height="9" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.631814 4.43687L0.0839844 4.9847L2.82313 8.8195H3.08335L10.9173 0.711624L10.3695 0.17749L3.08335 6.77884L0.631814 4.43687Z"
        className={styles.checkmarkPath}
      />
    </svg>
  )
}
