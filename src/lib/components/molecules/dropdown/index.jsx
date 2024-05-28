import { useState, useCallback, useMemo } from "preact/hooks"
import { Chevron } from "$particles"
import styles from "./style.module.css"

export function Dropdown({ title, hint, options, onSelect, collapseOnSelect = false, expandByDefault = true }) {
  const [expanded, setExpanded] = useState(expandByDefault)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onOptionClick = useCallback(
    (option, index) => {
      setSelectedIndex(index)
      if (onSelect) onSelect(option, index)
      if (collapseOnSelect) setExpanded(false)
    },
    [onSelect],
  )

  const optionGroups = useMemo(() => {
    const containsOptionGroups = "options" in options[0]
    if (!containsOptionGroups) {
      // create single option group
      return [{ options }]
    }

    // assign consecutive indices to options within groups
    let optionIndex = 0
    for (const group of options) {
      for (const option of group.options) {
        option.index = optionIndex
        optionIndex++
      }
    }

    return options
  }, options)

  const flatOptions = useMemo(() => {
    return optionGroups.map((group) => group.options).flat()
  }, [optionGroups])

  const iconForSelectedOption = useMemo(() => {
    const selectedOption = flatOptions[selectedIndex]
    return selectedOption.icon
  }, [flatOptions, selectedIndex])

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setExpanded((current) => !current)}>
        <img src={iconForSelectedOption} className={styles.icon} />
        <span className={styles.title}>{title}</span>
        <Chevron active={true} size="large" direction={expanded ? "up" : "down"} />
      </button>

      <div className={styles.popout} style={{ visibility: expanded ? "visible" : "hidden" }}>
        {hint && <p className={styles.hint}>{hint}</p>}
        {optionGroups.map((group) => (
          <OptionGroup {...group} selectedIndex={selectedIndex} onOptionClick={onOptionClick} />
        ))}
      </div>
    </div>
  )
}

function OptionGroup({ title, options, selectedIndex, onOptionClick }) {
  return (
    <>
      {title && <p className={styles.groupHeader}>{title}</p>}
      {options.map((option) => {
        return (
          <button key={option.title} className={styles.option} onClick={() => onOptionClick(option, option.index)}>
            <img src={option.icon} className={styles.optionIcon} />
            <div className={styles.optionText}>
              <h4 className={styles.optionTitle}>{option.title}</h4>
              <p className={styles.optionDescription}>{option.description}</p>
            </div>
            {option.index === selectedIndex && (
              <div className={styles.checkmark}>
                <Checkmark />
              </div>
            )}
          </button>
        )
      })}
    </>
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
