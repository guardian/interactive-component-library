import type { Meta, StoryObj } from '@storybook/preact'
import { Table } from '.'

// FIXME: underlying framework should not be exposed
import { createColumnHelper } from '@tanstack/react-table'

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

type User = {
  firstName: string
  lastName: string
  age: number
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: 'lastName',
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
]

const data: User[] = [
  {
    firstName: 'Niels',
    lastName: 'de Hoog',
    age: 38,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    age: 41,
  },
]

export const Default: Story = {
  render: () => Table({ columns, data }),
}
