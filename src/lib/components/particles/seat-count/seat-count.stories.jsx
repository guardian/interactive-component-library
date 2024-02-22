import { SeatCount } from '.'

const meta = {
  title: 'Particles/SeatCount',
  component: SeatCount,
}

export default meta

export const Default = {
  args: {
    partyName: 'Conservatives',
    partyColour: 'blue',
    seatCount: 2,
    seatChange: -1,
    align: 'left'
  },
}
