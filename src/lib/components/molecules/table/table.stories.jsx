import { Table } from '.'
import { LegendItem } from '$particles/legend-item'

const meta = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

export default meta

export const Default = {
  args: {
    columns: [
      {
        header: 'First name',
        accessor: 'firstName',
      },
      {
        header: 'Last name',
        accessor: 'lastName',
      },
    ],
    data: [
      {
        firstName: 'Margaret',
        lastName: 'Jones',
      },
      {
        firstName: 'Jake',
        lastName: 'Smith',
      },
    ],
  },
}

export const Sortable = {
  args: {
    columns: [
      {
        header: 'First name',
        accessor: 'firstName',
        sortable: true,
      },
      {
        header: 'Last name',
        accessor: 'lastName',
        sortable: true,
      },
    ],
    data: [
      {
        firstName: 'Margaret',
        lastName: 'Jones',
      },
      {
        firstName: 'Jake',
        lastName: 'Smith',
      },
    ],
  },
}

const partyToColorMap = {
  lab: 'lab',
  con: 'con',
  ld: 'libdem',
  green: 'green',
}

const columns = [
  {
    header: 'Party',
    accessor: 'partyName',
    cell: (d) => <LegendItem text={d.partyName} styles={{ dot: `bg-color--${partyToColorMap[d.abbreviation]}` }} />,
    cellStyle: {
      textAlign: 'text-left',
    },
  },
  {
    header: 'Seats',
    accessor: 'totalSeats',
    cellStyle: {
      width: 'w-1/5 mobile-xl:w-1/6',
      textAlign: 'text-right',
    },
    sort: {
      ascending: false,
    },
  },
  {
    header: 'Gains',
    accessor: 'gains',
    cellStyle: {
      width: 'w-1/5 mobile-xl:w-1/6',
      textAlign: 'text-right',
    },
  },
  {
    header: 'Losses',
    accessor: 'losses',
    cellStyle: {
      width: 'w-1/5 mobile-xl:w-1/6',
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

export const PartyResults = {
  args: {
    columns,
    data,
  },
  defaultViewport: 'desktop',
}
