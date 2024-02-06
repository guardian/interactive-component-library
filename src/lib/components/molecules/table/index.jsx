import { useTable } from './useTable'

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

function HeaderCell({ text, sortable, onClick }) {
  if (!sortable) {
    return text
  }
  return (
    <button onClick={onClick} className="w-full flex justify-end">
      {text}
      <span aria-hidden="true">
        <Chevron />
      </span>
    </button>
  )
}

function Chevron({ fill = '#052962' }) {
  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.80569 10.7123L11.6344 15H12.365L16.1938 10.7123L15.4997 10L11.9997 13L8.49976 10L7.80569 10.7123Z"
        fill={fill}
      />
    </svg>
  )
}
