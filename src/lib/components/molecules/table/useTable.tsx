import { JSX } from 'preact'

interface CellStyle {
  width?: string
  textAlign?: string
  padding?: string
}

export interface ColumnDefinition<TableRow> {
  id?: string
  header: () => string
  cell: (data: TableRow) => JSX.Element | string
  cellStyle?: CellStyle | string
}

export interface TableProps<TableRow> {
  columns: ColumnDefinition<TableRow>[]
  data: TableRow[]
}

export function useTable<TableRow>({ columns, data }: TableProps<TableRow>) {
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

class DefaultCellStyle implements CellStyle {
  textAlign = 'text-left'
  padding = 'px-1'
}

class ColumnModel<TableRow> {
  _id?: string
  header: string
  cell: (d: TableRow) => JSX.Element | string
  cellStyle: CellStyle | string = new DefaultCellStyle()

  constructor(definition: ColumnDefinition<TableRow>) {
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

  getCellClass(): string {
    if (typeof this.cellStyle === 'string') return this.cellStyle
    return Object.values(this.cellStyle).join(' ')
  }
}

class RowModel<TableRow> {
  index: number
  cells: CellModel<TableRow>[]

  constructor(index: number, cells: CellModel<TableRow>[]) {
    this.index = index
    this.cells = cells
  }

  get id() {
    return this.index
  }
}

class CellModel<TableRow> {
  index: number
  value: JSX.Element | string
  column: ColumnModel<TableRow>

  constructor(index: number, value: JSX.Element | string, column: ColumnModel<TableRow>) {
    this.index = index
    this.value = value
    this.column = column
  }

  get id() {
    return this.index
  }
}
