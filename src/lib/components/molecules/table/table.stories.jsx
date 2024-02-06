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
    accessor: 'totalSeats',
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
    sortable: true,
  },
  {
    header: () => 'Gains',
    accessor: 'gains',
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
    sortable: true,
  },
  {
    header: () => 'Losses',
    accessor: 'losses',
    cell: (d) => d.losses.toString(),
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
    sortable: true,
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
