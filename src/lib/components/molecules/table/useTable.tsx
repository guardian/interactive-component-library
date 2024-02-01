import { JSX } from 'preact'

export enum CellAlignment {
  Left = 'text-left',
  Right = 'text-right',
}

export interface ColumnDefinition<TableRow> {
  id?: string
  header: () => string
  cell: (data: TableRow) => JSX.Element | string
  alignment?: CellAlignment
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

class ColumnModel<TableRow> {
  _id?: string
  header: string
  cell: (d: TableRow) => JSX.Element | string
  _alignment = CellAlignment.Left

  constructor(definition: ColumnDefinition<TableRow>) {
    this._id = definition.id
    this.header = definition.header()
    this.cell = definition.cell
    if (definition.alignment) {
      this._alignment = definition.alignment
    }
  }

  get id() {
    return this._id || this.header
  }

  get alignment() {
    return this._alignment.valueOf()
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
