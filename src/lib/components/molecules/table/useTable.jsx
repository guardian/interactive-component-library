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
        return new CellModel(column, columnIndex, d, column.cell)
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

class DefaultHeaderCellStyle extends DefaultCellStyle {
  fontWeight = 'font-bold'
}

class ColumnModel {
  constructor(definition, onSort) {
    this.definition = definition
    this.onSort = onSort
  }

  get id() {
    return this.definition.id || this.header
  }

  get accessor() {
    return this.definition.accessor
  }

  get header() {
    return this.definition.header()
  }

  get headerProps() {
    return {
      text: this.header,
      sortable: this.definition.sortable,
      onClick: this.onSort,
    }
  }

  get headerCellStyle() {
    const definition = this.definition
    const defaultStyle = new DefaultHeaderCellStyle()

    if (typeof definition.headerCellStyle === 'object') {
      return Object.assign(defaultStyle, definition.headerCellStyle)
    } else if (typeof definition.headerCellStyle === 'string') {
      return definition.headerCellStyle
    }

    return defaultStyle
  }

  get headerCellClass() {
    if (typeof this.headerCellStyle === 'string') return this.headerCellStyle
    const styles = Object.values(this.headerCellStyle)
    return styles.join(' ')
  }

  get cell() {
    return this.definition.cell
  }

  get cellStyle() {
    const definition = this.definition
    const defaultStyle = new DefaultCellStyle()

    if (typeof definition.cellStyle === 'object') {
      return Object.assign(defaultStyle, definition.cellStyle)
    } else if (typeof definition.cellStyle === 'string') {
      return definition.cellStyle
    }

    return defaultStyle
  }

  get cellClass() {
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
  constructor(column, columnIndex, row, cell) {
    this.column = column
    this.columnIndex = columnIndex
    this.row = row
    this.cell = cell
  }

  get id() {
    return this.columnIndex
  }

  get displayValue() {
    if (this.cell) {
      return this.cell(this.row)
    }

    return this.row[this.column.accessor].toString()
  }
}
