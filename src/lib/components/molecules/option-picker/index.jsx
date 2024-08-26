import { useState, useCallback } from "preact/hooks"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.css"

/** @typedef {  "vertical" | "horizontal" } OptionLayoutDirection */

export function OptionPicker({
  title,
  options,
  layoutDirection = "horizontal",
  onSelect,
  styles,
}) {
  styles = mergeStyles(defaultStyles, styles)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const onOptionClick = useCallback(
    (option, index) => {
      if (index === selectedIndex) return

      setSelectedIndex(index)
      if (onSelect) onSelect(index, option)
    },
    [selectedIndex, onSelect],
  )

  return (
    <div className={styles.optionPicker}>
      {title && <span className={styles.title}>{title}</span>}
      <div className={[styles.options, layoutDirection].join(" ")}>
        {options.map((option, index) => {
          const isSelected = index === selectedIndex
          return (
            <button
              key={option.title}
              className={[
                styles.option,
                isSelected ? styles.selected : "",
              ].join(" ")}
              onClick={() => onOptionClick(option, index)}
            >
              <div className={styles.optionIconContainer}>
                {typeof option.icon === "string" ? (
                  <img src={option.icon} className={styles.optionIcon} />
                ) : (
                  option.icon
                )}
                {isSelected && (
                  <div className={styles.checkmark}>
                    <Checkmark />
                  </div>
                )}
              </div>
              <div className={styles.optionText}>
                <h4 className={styles.optionTitle}>{option.title}</h4>
                <p className={styles.optionDescription}>{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Checkmark() {
  return (
    <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.631814 4.43687L0.0839844 4.9847L2.82313 8.8195H3.08335L10.9173 0.711624L10.3695 0.17749L3.08335 6.77884L0.631814 4.43687Z"
        className={defaultStyles.checkmarkPath}
      />
    </svg>
  )
}
