import type { Meta, StoryObj } from '@storybook/preact'
import type { ColumnDefinition } from '.'
import { Table } from '.'

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

type PartyResult = {
  partyName: string
  totalSeats: number
  gains: number
  losses: number
}

const columns: ColumnDefinition<PartyResult>[] = [
  {
    header: () => 'Party',
    cell: (d) => d.partyName,
    cellStyle: {
      textAlign: 'text-left',
    },
  },
  {
    header: () => 'Seats',
    cell: (d) => d.totalSeats.toString(),
    cellStyle: {
      width: 'w-1/6',
      textAlign: 'text-right',
    },
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
    cellStyle: 'text-right px-2 w-1/6',
  },
]

const data: PartyResult[] = [
  {
    partyName: 'Conservatives',
    totalSeats: 38,
    gains: 0,
    losses: 47,
  },
  {
    partyName: 'Labour',
    totalSeats: 41,
    gains: 20,
    losses: 2,
  },
  {
    partyName: 'Liberal Democrats',
    totalSeats: 19,
    gains: 12,
    losses: 4,
  },
  {
    partyName: 'Green',
    totalSeats: 6,
    gains: 2,
    losses: 1,
  },
]

export const Default: Story = {
  args: {
    columns,
    data,
  },
}