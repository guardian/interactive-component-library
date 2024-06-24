import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import { useContainerSize } from "$shared/hooks/useContainerSize"
import { useRef } from "preact/hooks"

export const WaffleType = {
  circle: "circle",
  square: "square",
}

const WaffleUnit = ({ type, attributes }) => (type === WaffleType.square ? <rect {...attributes} /> : <circle {...attributes} />)

export const Waffle = ({ units, numberOfRows, type = WaffleType.circle, idAccessor, onMouseOver = () => {}, onClick = () => {}, styles, svgId }) => {
  const containerRef = useRef()
  const containerSize = useContainerSize(containerRef)
  const width = containerSize ? containerSize.width : 0
  const total = units.length
  const columns = Math.ceil(total / numberOfRows)
  const unitWidth = width / columns
  const unitHeight = unitWidth
  const height = numberOfRows * unitHeight

  styles = mergeStyles(defaultStyles, styles)

  return (
    <div ref={containerRef} className={styles.container}>
      {containerSize && (
        <svg viewBox={`0 0 ${width} ${height}`} class={styles.svg} id={svgId}>
          <g>
            {units.map((unit, j) => {
              let attributes

              if (type === WaffleType.square) {
                attributes = {
                  id: unit[idAccessor] || `w-${j}`,
                  onMouseOver: (e) => onMouseOver(unit, e),
                  onClick: (e) => onClick(unit, e),
                  class: `${styles.unit} ${unit.class}`,
                  height: unitHeight,
                  width: unitWidth,
                  x: unitWidth * Math.floor(j / numberOfRows),
                  y: unitHeight * (j % numberOfRows),
                }
              } else {
                attributes = {
                  id: unit[idAccessor] || `w-${j}`,
                  onMouseOver: (e) => onMouseOver(unit, e),
                  onClick: (e) => onClick(unit, e),
                  class: `${styles.unit} ${unit.class}`,
                  r: unitWidth / 2,
                  transform: `translate(${unitWidth * Math.floor(j / numberOfRows) + unitWidth / 2}, ${unitHeight * (j % numberOfRows) + unitHeight / 2})`,
                }
              }

              return <WaffleUnit key={`wu-${j}`} type={type} attributes={attributes} />
            })}
          </g>
        </svg>
      )}
    </div>
  )
}
