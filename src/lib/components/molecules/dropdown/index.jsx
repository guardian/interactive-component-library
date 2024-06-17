import { useState, useCallback, useMemo } from "preact/hooks"
import { Chevron } from "$particles"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.css"

export function Dropdown({ title, hint, options, onSelect, multipleSelect = false, iconForSelectedIndexPaths, collapseOnSelect = false, expandByDefault = true, styles }) {
  styles = mergeStyles(defaultStyles, styles)

  const optionGroups = useMemo(() => {
    const containsOptionGroups = "options" in options[0]
    if (!containsOptionGroups) {
      // create single option group
      options.forEach((option, index) => {
        option.index = index
      })
      return [{ group: 0, options }]
    }

    for (const [groupIndex, group] of options.entries()) {
      for (const [optionIndex, option] of group.options.entries()) {
        option.group = groupIndex
        option.index = optionIndex
      }
      group.index = groupIndex
    }

    return options
  }, options)

  const [expanded, setExpanded] = useState(expandByDefault)
  const [selectedIndexPaths, setSelectedIndexPaths] = useState(() => createInitialIndexPaths(optionGroups, multipleSelect))

  const onOptionClick = useCallback(
    (option, index) => {
      const indexPath = [option.group, index]
      if (multipleSelect) {
        setSelectedIndexPaths((selectedIndexPaths) => {
          selectedIndexPaths[option.group] = indexPath
          return [...selectedIndexPaths]
        })
      } else {
        setSelectedIndexPaths([indexPath])
      }
      if (onSelect) onSelect(option, indexPath)
      if (collapseOnSelect) setExpanded(false)
    },
    [onSelect, collapseOnSelect, multipleSelect],
  )

  const iconForSelectedOption = useMemo(() => {
    if (multipleSelect && iconForSelectedIndexPaths) {
      return iconForSelectedIndexPaths(selectedIndexPaths)
    }
    const firstSelectedIndexPath = selectedIndexPaths[0]
    const selectedOption = optionGroups[firstSelectedIndexPath[0]].options[firstSelectedIndexPath[1]]
    return selectedOption.icon
  }, [optionGroups, selectedIndexPaths])

  const selectedIndexForGroup = useCallback(
    (groupIndex) => {
      if (multipleSelect) {
        return selectedIndexPaths[groupIndex][1]
      } else if (selectedIndexPaths[0][0] === groupIndex) {
        return selectedIndexPaths[0][1]
      }
      return -1
    },
    [selectedIndexPaths, multipleSelect],
  )

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setExpanded((current) => !current)}>
        <img src={iconForSelectedOption} className={styles.icon} />
        <span className={styles.title}>{title}</span>
        <Chevron active={true} size="large" direction={expanded ? "up" : "down"} />
      </button>
      <div className={styles.clearFix} />
      <div className={styles.popout} style={{ visibility: expanded ? "visible" : "hidden" }}>
        {hint && <p className={styles.hint}>{hint}</p>}
        {optionGroups.map((group, index) => {
          return <OptionGroup {...group} selectedIndex={selectedIndexForGroup(index)} onOptionClick={onOptionClick} styles={styles} />
        })}
      </div>
    </div>
  )
}

function OptionGroup({ title, className, options, selectedIndex, onOptionClick, styles }) {
  return (
    <>
      {title && <span className={styles.groupHeader}>{title}</span>}
      {options.map((option) => {
        const isSelected = option.index === selectedIndex
        return (
          <button key={option.title} className={[styles.option, className, isSelected ? styles.selected : ""].join(" ")} onClick={() => onOptionClick(option, option.index)}>
            <img src={option.icon} className={styles.optionIcon} />
            <div className={styles.optionText}>
              <h4 className={styles.optionTitle}>{option.title}</h4>
              <p className={styles.optionDescription}>{option.description}</p>
            </div>
            {isSelected && (
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
        className={defaultStyles.checkmarkPath}
      />
    </svg>
  )
}

function createInitialIndexPaths(groups, multipleSelect) {
  if (multipleSelect) {
    return groups.map((group) => [group.index, 0])
  }

  return [[0, 0]]
}
