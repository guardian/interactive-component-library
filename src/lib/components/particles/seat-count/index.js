export function SeatCount({ partyName, seatCount }) {
  return (
    <div>
      <div style={{ width: '100px', height: '3px', backgroundColor: 'blue' }} />
      <div>{partyName}</div>
      <div>{seatCount}</div>
    </div>
  )
}
