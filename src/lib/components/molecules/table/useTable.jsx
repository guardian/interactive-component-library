import { useState } from 'preact/hooks'

export function useTable({ columns, data }) {
  const [rows, setRows] = useState(data)
  const [sortState, setSortState] = useState({ columnIndex: -1, ascending: false })

  function sortRows(column, columnIndex) {
    return () => {
      let ascending = false
      if (sortState.columnIndex === columnIndex) {
        ascending = !sortState.ascending
      }

      if (ascending) {
        setRows(rows.toSorted((a, b) => a[column.accessor] - b[column.accessor]))
      } else {
        setRows(rows.toSorted((a, b) => b[column.accessor] - a[column.accessor]))
      }
      setSortState({
        columnIndex,
        ascending,
      })
    }
  }

  function getColumns() {
    return columns.map((column, columnIndex) => {
      return new ColumnModel(column, sortRows(column, columnIndex))
    })
  }

  function getRows() {
    return rows.map((d, rowIndex) => {
      const cells = getColumns().map((column, columnIndex) => {
        return new CellModel(columnIndex, column.cell(d), column)
      })
      return new RowModel(rowIndex, cells)
    })
  }

  return {
    getColumns,
    getRows,
  }
}

class DefaultCellStyle {
  textAlign = 'text-left'
  padding = 'py-2'
  fontFamily = 'font-sans'
  fontSize = 'text-sm'
  textColor = 'text-neutral-7'
  whitespace = 'whitespace-nowrap'
}

class HeaderCellStyle extends DefaultCellStyle {
  fontWeight = 'font-bold'
}

class ColumnModel {
  headerCellStyle = new HeaderCellStyle()
  cellStyle = new DefaultCellStyle()
  sortable = false

  constructor(definition, onSort) {
    this._id = definition.id
    this.header = definition.header
    this.cell = definition.cell
    this.sortable = definition.sortable || false
    this.onSort = onSort

    if (definition.headerCellStyle) {
      if (typeof definition.headerCellStyle === 'object') {
        Object.assign(this.headerCellStyle, definition.headerCellStyle)
      } else {
        this.headerCellStyle = definition.headerCellStyle
      }
    }

    if (definition.cellStyle) {
      if (typeof definition.cellStyle === 'object') {
        Object.assign(this.cellStyle, definition.cellStyle)
      } else {
        this.cellStyle = definition.cellStyle
      }
    }
  }

  get id() {
    return this._id || this.header
  }

  get headerProps() {
    return {
      text: this.header(),
      sortable: this.sortable,
      onClick: this.onSort,
    }
  }

  getHeaderCellClass() {
    if (typeof this.headerCellStyle === 'string') return this.headerCellStyle
    const styles = Object.values(this.headerCellStyle)
    return styles.join(' ')
  }

  getCellClass() {
    if (typeof this.cellStyle === 'string') return this.cellStyle
    const styles = Object.values(this.cellStyle)
    if (this.sortable) {
      styles.push('pr-4')
    }
    return styles.join(' ')
  }
}

class RowModel {
  constructor(index, cells) {
    this.index = index
    this.cells = cells
  }

  get id() {
    return this.index
  }
}

class CellModel {
  constructor(index, value, column) {
    this.index = index
    this.value = value
    this.column = column
  }

  get id() {
    return this.index
  }
}
