import type { TableProps } from './useTable'
import { useTable } from './useTable'

export function Table<TableRow>({ columns, data }: TableProps<TableRow>) {
  const table = useTable({ columns, data })

  return (
    <table class="w-full">
      <thead>
        <tr>
          {table.getColumns().map((column) => (
            <th key={column.id}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.getRows().map((row) => (
          <tr key={row.id}>
            {row.cells.map((cell) => (
              <td key={cell.id}>{cell.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
