import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"


const renderUnit = (squares, attributes) => squares ? <rect {...attributes} /> : <circle {...attributes} />

export const Waffle = ({ units, rows, total, squares = false, abbreviationAccessor = 'party', onMouseOver, paddingTop, showHalfLine, styles }) => {
  //units is an array of objects with the following structure: { [abbreviationAccessor]: 'A' }.
  const width = 1300
  const columns = Math.ceil(total / rows)
  const unitWidth = width / columns
  const unitHeight = unitWidth
  const height = rows * unitHeight + paddingTop
  
  styles = mergeStyles(defaultStyles, styles)

  return (
    <svg viewBox={`0 0 ${width} ${height}`} class={styles.svg}>
      <g>
        {
          units.map((unit, j) => {
            const attributes = squares ?
            { onMouseOver: e => onMouseOver(unit, e), class: `${styles.unit} fill-color--${unit[abbreviationAccessor]}`, height: unitHeight, width: unitWidth, x: unitWidth * Math.floor(j / rows), y: unitHeight * (j % rows) + paddingTop} :
            { onMouseOver: e => onMouseOver(unit, e), class: `${styles.unit} fill-color--${unit[abbreviationAccessor]}`, r: unitWidth / 2, transform: `translate(${unitWidth * Math.floor(j / rows) + unitWidth / 2}, ${unitHeight * (j % rows) + unitHeight / 2 + paddingTop})` }

            return renderUnit(squares, attributes)
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