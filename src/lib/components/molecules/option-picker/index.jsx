import { useState, useCallback } from "preact/hooks"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.css"

/** @typedef { ("vertical" | "horizontal") } OptionLayoutDirection */

/**
 * @typedef { Object } Option
 * @prop { String } title
 * @prop { String } [description]
 * @prop { String | import("preact").JSX.Element } icon
 */

/**
 * OptionPicker component
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {Option[]} props.options
 * @param {OptionLayoutDirection} [props.layoutDirection="horizontal"]
 * @param {number} [props.initialSelectedIndex=0]
 * @param {(index: number, option: Object) => void} [props.onSelect]
 * @param {Object} [props.styles]
 * @returns
 */
export function OptionPicker({
  title,
  options,
  layoutDirection = "horizontal",
  initialSelectedIndex = 0,
  onSelect,
  styles,
}) {
  styles = mergeStyles(defaultStyles, styles)

  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)

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
      <div
        className={[styles.options, layoutDirection].join(" ")}
        role="listbox"
        aria-orientation={layoutDirection}
        aria-activedescendant={`option-${selectedIndex}`}
      >
        {options.map((option, index) => {
          const isSelected = index === selectedIndex
          const optionId = `option-${index}`
          return (
            <button
              id={optionId}
              key={optionId}
              className={[
                styles.option,
                isSelected ? styles.selected : "",
              ].join(" ")}
              onClick={() => onOptionClick(option, index)}
              role="option"
              aria-selected={isSelected}
            >
              <div className={styles.optionIconContainer}>
                {typeof option.icon === "string" ? (
                  <img
                    src={option.icon}
                    className={styles.optionIcon}
                    role="presentation"
                  />
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
