export function useTable({ columns, data }) {
  function getColumns() {
    return columns.map((column) => {
      return new ColumnModel(column)
    })
  }

  function getRows() {
    return data.map((d, rowIndex) => {
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
}

class ColumnModel {
  cellStyle = new DefaultCellStyle()

  constructor(definition) {
    this._id = definition.id
    this.header = definition.header()
    this.cell = definition.cell

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

  getCellClass() {
    if (typeof this.cellStyle === 'string') return this.cellStyle
    return Object.values(this.cellStyle).join(' ')
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
