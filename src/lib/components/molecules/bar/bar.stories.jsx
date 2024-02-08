import { Bar } from '.'
import { PartyBackgroundColors } from '$headless/colors'

const meta = {
  title: 'Molecules/Bar',
  component: Bar,
}

export default meta

const data = [
  {
    partyName: 'Conservatives',
    abbreviation: 'con',
    totalSeats: 38,
    gains: 0,
    losses: 47,
  },
  {
    partyName: 'Labour',
    abbreviation: 'lab',
    totalSeats: 41,
    gains: 20,
    losses: 2,
  },
  {
    partyName: 'Liberal Democrats',
    abbreviation: 'ld',
    totalSeats: 21,
    gains: 12,
    losses: 4,
  },
  {
    partyName: 'Green',
    abbreviation: 'green',
    totalSeats: 4,
    gains: 2,
    losses: 1,
  },
]

export const Default = {
  args: {
    data,
    showNumbers: true,
    numKey: 'totalSeats',
    abbrKey: 'abbreviation',
    height: 20,
    // relativeTotal: 100,
  },
  render: (args) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" style={{ height: 40 }}>
      <Bar {...args} />
    </svg>
  ),
}
