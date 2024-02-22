export function SeatCount({ partyName, partyColour, seatCount, seatChange, align }) {
  return (
    <div>
      <div style={{ width: '100px', height: '3px', backgroundColor: partyColour }} />
      <div>{partyName}</div>
      <div>{seatCount}</div>
      <div>{seatChange}</div>
    </div>
  )
}
