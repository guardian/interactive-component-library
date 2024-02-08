import { useTable } from './useTable'
import { useState, useCallback, useMemo } from 'preact/hooks'
import { Chevron } from '$atoms/chevron'

export function Table({ columns, data }) {
  const initialSortState = useMemo(() => {
    const columnIndex = columns.findIndex((column) => {
      if ('sort' in column) {
        return true
      }
      return false
    })
    if (columnIndex === -1) return

    return {
      columnIndex,
      ascending: columns[columnIndex].sort.ascending,
    }
  }, [columns])

  const [sortedColumnIndex, setSortedColumnIndex] = useState(initialSortState.columnIndex)
  const [sortAscending, setSortAscending] = useState(initialSortState.ascending || false)
  const table = useTable({ columns, data, sortState: { columnIndex: sortedColumnIndex, ascending: sortAscending } })

  const sortByColumn = useCallback(
    (index) => {
      if (sortedColumnIndex === index) {
        setSortAscending(!sortAscending)
      }

      setSortedColumnIndex(index)
    },
    [sortedColumnIndex, sortAscending],
  )

  return (
    <table class="w-full table-fixed">
      <thead>
        <tr>
          {table.columns.map((column, index) => (
            <th key={column.id} className={column.headerCellClass}>
              <HeaderCell onClick={() => sortByColumn(index)} {...column.headerProps} />
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
