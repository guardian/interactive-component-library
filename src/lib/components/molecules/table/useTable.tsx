import { JSX } from 'preact'

interface ColumnDefinition<TableRow> {
  id?: string
  header: () => string
  cell: (data: TableRow) => JSX.Element | string
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
      const cells = columns.map((column, columnIndex) => {
        return new CellModel(columnIndex, column.cell(d))
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

  constructor(definition: ColumnDefinition<TableRow>) {
    this._id = definition.id
    this.header = definition.header()
  }

  get id() {
    return this._id || this.header
  }
}

class RowModel {
  index: number
  cells: CellModel[]

  constructor(index: number, cells: CellModel[]) {
    this.index = index
    this.cells = cells
  }

  get id() {
    return this.index
  }
}

class CellModel {
  index: number
  value: JSX.Element | string

  constructor(index: number, value: JSX.Element | string) {
    this.index = index
    this.value = value
  }

  get id() {
    return this.index
  }
}
