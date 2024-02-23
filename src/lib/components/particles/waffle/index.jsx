const renderUnit = (squares, attributes) => squares ? <rect {...attributes} /> : <circle {...attributes} />

export const Waffle = ({ units, rows, total, squares = false, abbreviationAccessor = 'party', onMouseOver, paddingTop }) => {
  //units is an array of objects with the following structure: { [abbreviationAccessor]: 'A' }.
  const width = 1300
  const columns = Math.ceil(total / rows)
  const unitWidth = width / columns
  const unitHeight = unitWidth
  const height = rows * unitHeight + paddingTop
  
  return (
    <div class='gv-waffle'>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <g>
          {
            units.map((unit, j) => {
              const attributes = squares ?
              { onMouseOver: e => onMouseOver(unit, e), class: `fill-color--${unit[abbreviationAccessor]}`, height: unitHeight, width: unitWidth, x: unitWidth * Math.floor(j / rows), y: unitHeight * (j % rows) + paddingTop} :
              { onMouseOver: e => onMouseOver(unit, e), class: `fill-color--${unit[abbreviationAccessor]}`, r: unitWidth / 2, transform: `translate(${unitWidth * Math.floor(j / rows) + unitWidth / 2}, ${unitHeight * (j % rows) + unitHeight / 2 + paddingTop})` }

              return renderUnit(squares, attributes)
            })
          }
          <g>
            <line x1={width / 2} x2={width / 2} y1={20} y2={height} stroke='red' />
            <text x={width / 2} y={0} style={{ textAnchor: 'middle', alignmentBaseline: 'hanging'}} fontSize='20'>{`${Math.ceil(total / 2)} for a majority`}</text>
          </g>
        </g>
      </svg>
    </div>
  )
}