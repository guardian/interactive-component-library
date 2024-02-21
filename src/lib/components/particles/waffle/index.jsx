const renderUnit = ({ squares, attributes }) => squares ? <rect {...attributes} /> : <circle {...attributes} />

const Waffle = ({ seats, rows, total, squares=false }) => {
  const width = 800
  const partySeats = seats ? [].concat.apply([], seats.filter(d => d.total > 0).map(partyObj => Array(partyObj.total).fill(partyObj.party))) : Array(totalSeats).fill(null)

  const columns = Math.ceil(total / rows)
  const unitWidth = Math.floor(width / columns)
  const unitHeight = unitWidth

  const height = rows * unitHeight

  return (
    <div class='gv-waffle'>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio={"xMinYMin"}>
        {
          partySeats.map((party, j) =>
            renderUnit(squares, { class: `fill-color--${party}`, height: unitHeight - 0.8, width: unitWidth - 0.8, x: unitWidth * Math.floor(j / rows), y: unitHeight * (j % rows)})
          )
        }
      </svg>
    </div>
  )
}

  export default Waffle