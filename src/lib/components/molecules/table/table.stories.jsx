import { Table } from '.'
import { LegendItem } from '$particles/legend-item'
import styles from './table.stories.module.css'

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
    hideHeader: false,
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

const columns = [
  {
    header: 'Party',
    accessor: 'partyName',
    cell: (d) => <LegendItem text={d.partyName} styles={{ dot: `bg-color--${d.abbreviation}` }} />,
    styles: {
      headerCell: styles['w-2/5'],
    },
  },
  {
    header: 'Seats',
    accessor: 'totalSeats',
    styles: {
      headerCell: [styles['w-1/5'], styles.rightAlign].join(' '),
      bodyCell: styles.rightAlign,
    },
    sort: {
      ascending: false,
    },
  },
  {
    header: 'Gains',
    accessor: 'gains',
    styles: {
      headerCell: [styles['w-1/5'], styles.rightAlign].join(' '),
      bodyCell: styles.rightAlign,
    },
  },
  {
    header: 'Losses',
    accessor: 'losses',
    styles: {
      headerCell: [styles['w-1/5'], styles.rightAlign].join(' '),
      bodyCell: styles.rightAlign,
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
    abbreviation: 'libdem',
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
}
