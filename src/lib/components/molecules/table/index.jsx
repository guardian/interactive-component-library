import { useTable } from './useTable'

export function Table({ columns, data }) {
  const table = useTable({ columns, data })

  return (
    <table class="w-full">
      <thead>
        <tr>
          {table.getColumns().map((column) => (
            <th key={column.id} className={column.getCellClass()}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.getRows().map((row) => (
          <tr key={row.id} className="border-t border-slate-200">
            {row.cells.map((cell) => (
              <td key={cell.id} className={cell.column.getCellClass()}>
                {cell.value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
