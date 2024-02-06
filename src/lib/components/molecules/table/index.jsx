import { useTable } from './useTable'
import { Chevron } from '$atoms/chevron'

export function Table({ columns, data }) {
  const table = useTable({ columns, data })

  return (
    <table class="w-full mr-4">
      <thead>
        <tr>
          {table.getColumns().map((column) => (
            <th key={column.id} className={column.headerCellClass}>
              <HeaderCell {...column.headerProps} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.getRows().map((row) => (
          <tr key={row.id} className="border-t border-neutral-86">
            {row.cells.map((cell) => (
              <td key={cell.id} className={cell.column.cellClass}>
                {cell.displayValue}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function HeaderCell({ text, sortable, onClick, justify }) {
  if (!sortable) {
    return text
  }

  return (
    <button onClick={onClick} className={`w-full flex ${justify}`}>
      {text}
      <span aria-hidden="true">
        <Chevron />
      </span>
    </button>
  )
}
