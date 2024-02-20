import { useState } from 'preact/hooks'
import { useTable } from './useTable'
import { Chevron } from '$particles'

export function Table({ columns, data }) {
  const [sortState, setSortState] = useState(() => {
    const columnIndex = columns.findIndex((column) => {
      if ('sort' in column) {
        return true
      }
      return false
    })

    const ascending = columnIndex >= 0 ? columns[columnIndex].sort.ascending : false
    return {
      columnIndex,
      ascending,
    }
  })
  const table = useTable({ columns, data, sortState })

  const sortByColumn = (index) => {
    setSortState((currentState) => {
      return {
        columnIndex: index,
        ascending: index === currentState.columnIndex ? !currentState.ascending : false,
      }
    })
  }

  return (
    <table class="w-full table-fixed">
      <thead>
        <tr>
          {table.columns.map((column, index) => (
            <th key={column.id} className={column.headerCellClass}>
              <HeaderCell key={index} onClick={() => sortByColumn(index)} {...column.headerProps} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
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

function HeaderCell({ text, sortable, isSorted, justify, onClick }) {
  if (!sortable) {
    return text
  }

  let direction = 'down'
  if (isSorted?.ascending === false) {
    direction = 'up'
  }

  return (
    <button onClick={onClick} className={`w-full flex ${justify}`}>
      {text}
      <span aria-hidden="true">
        <Chevron active={!!isSorted} direction={direction} />
      </span>
    </button>
  )
}
