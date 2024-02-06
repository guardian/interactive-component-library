import { Table } from '.'
import { LegendItem } from '$atoms/legend-item'
import { PartyBackgroundColors } from '$headless/colors'

const meta = {
  title: 'Molecules/Table',
  component: Table,
}

export default meta

const columns = [
  {
    header: () => 'Party',
    cell: (d) => <LegendItem circleClass={PartyBackgroundColors[d.abbreviation]} text={d.partyName} />,
    cellStyle: {
      textAlign: 'text-left',
    },
  },
  {
    header: () => 'Seats',
    value: (d) => d.totalSeats,
    cell: (d) => d.totalSeats.toString(),
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
    sortable: true,
  },
  {
    header: () => 'Gains',
    cell: (d) => d.gains.toString(),
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
  },
  {
    header: () => 'Losses',
    cell: (d) => d.losses.toString(),
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
  },
]

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
    totalSeats: 19,
    gains: 12,
    losses: 4,
  },
  {
    partyName: 'Green',
    abbreviation: 'green',
    totalSeats: 6,
    gains: 2,
    losses: 1,
  },
]

export const Default = {
  args: {
    columns,
    data,
  },
}

export const Sortable = {
  args: {
    columns,
    data,
  },
}
