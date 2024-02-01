import type { Meta, StoryObj } from '@storybook/preact'
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
  // gains: number
  // losses: number
}

const columns = [
  {
    header: () => 'Party',
    cell: (d) => d.partyName,
  },
  {
    header: () => 'Seats',
    cell: (d) => d.totalSeats,
  },
]

const data: PartyResult[] = [
  {
    partyName: 'Conservatives',
    totalSeats: 38,
  },
  {
    partyName: 'Labour',
    totalSeats: 41,
  },
]

export const Default: Story = {
  args: {
    columns,
    data,
  },
}
