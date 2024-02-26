import { useState } from 'preact/hooks'
import { useTable } from './useTable'
import { Chevron } from '$particles/chevron'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function Table({ columns, data, styles }) {
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

  styles = mergeStyles(defaultStyles, styles)

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {table.columns.map((column, index) => (
            <th key={column.id} className={styles.headerCell}>
              <HeaderCell key={index} styles={styles} onClick={() => sortByColumn(index)} {...column.headerProps} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row) => (
          <tr key={row.id} className={styles.bodyRow}>
            {row.cells.map((cell) => (
              <td key={cell.id} className={styles.bodyCell}>
                {cell.displayValue}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function HeaderCell({ text, sortable, isSorted, styles, onClick }) {
  if (!sortable) {
    return text
  }

  let direction = 'down'
  if (isSorted?.ascending === false) {
    direction = 'up'
  }

  return (
    <button onClick={onClick} className={styles.headerCellButton}>
      <span>{text}</span>
      <Chevron active={!!isSorted} direction={direction} />
    </button>
  )
}
