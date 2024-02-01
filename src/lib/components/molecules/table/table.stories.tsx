import type { Meta, StoryObj } from '@storybook/preact'
import type { ColumnDefinition } from '.'
import { Table, CellAlignment } from '.'

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
  // losses: number
}

const columns: ColumnDefinition<PartyResult>[] = [
  {
    header: () => 'Party',
    cell: (d) => d.partyName,
  },
  {
    header: () => 'Seats',
    cell: (d) => d.totalSeats.toString(),
    alignment: CellAlignment.Right,
  },
  {
    header: () => 'Gains',
    cell: (d) => d.gains.toString(),
    alignment: CellAlignment.Right,
  },
]

const data: PartyResult[] = [
  {
    partyName: 'Conservatives',
    totalSeats: 38,
    gains: 0,
  },
  {
    partyName: 'Labour',
    totalSeats: 41,
    gains: 20,
  },
  {
    partyName: 'Liberal Democrats',
    totalSeats: 41,
    gains: 12,
  },
]

export const Default: Story = {
  args: {
    columns,
    data,
  },
}
