import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const WaffleType = {
  circle: 'circle',
  square: 'square',
}

const WaffleUnit = ({ type, attributes }) => type === WaffleType.square ? <rect {...attributes} /> : <circle {...attributes} />

export const Waffle = ({ units, numberOfRows, type = WaffleType.circle, idAccessor = 'party', onMouseOver, paddingTop, showHalfLine, styles }) => {
  //units is an array of objects with the following structure: { [idAccessor]: 'A' }.
  const width = 1300
  const total = units.length
  const columns = Math.ceil(total / numberOfRows)
  const unitWidth = width / columns
  const unitHeight = unitWidth
  const height = numberOfRows * unitHeight + paddingTop
  
  styles = mergeStyles(defaultStyles, styles)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} class={styles.svg}>
      <g>
        {
          units.map((unit, j) => {
            const attributes = type === WaffleType.square ?
            { onMouseOver: e => onMouseOver(unit, e), class: `${styles.unit} fill-color--${unit[idAccessor]}`, height: unitHeight, width: unitWidth, x: unitWidth * Math.floor(j / numberOfRows), y: unitHeight * (j % numberOfRows) + paddingTop} :
            { onMouseOver: e => onMouseOver(unit, e), class: `${styles.unit} fill-color--${unit[idAccessor]}`, r: unitWidth / 2, transform: `translate(${unitWidth * Math.floor(j / numberOfRows) + unitWidth / 2}, ${unitHeight * (j % numberOfRows) + unitHeight / 2 + paddingTop})` }

            return <WaffleUnit key={`wu-${j}`} type={type} attributes={attributes} />
          })
        }
      </g>
      {showHalfLine &&
        <g>
          <line class={styles.line} x1={width / 2} x2={width / 2} y1={0} y2={height} stroke='#121212' />
        </g>
      }
    </svg>
  )
}