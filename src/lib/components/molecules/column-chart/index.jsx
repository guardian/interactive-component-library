// import { useMemo, useRef, useState, useLayoutEffect } from 'preact/hooks'
import defaultStyles from './style.module.css'
// import { mergeStyles } from '$styles/helpers/mergeStyles'
import { scaleLinear } from 'd3-scale'
// import { scaleLinear } from './column-chart-util'

export const ColumnChart = ({
  columns,
  maxValue,
  minValue,
  chartHeight,
  chartWidth,
  columnWidth,
  columnPadding
  // styles = {},
}) => {
 
  const yScale = scaleLinear([maxValue,minValue], [0, chartHeight])

  return (
    <>
  <svg width={chartWidth} height={chartHeight} style="">
    {columns.map((column, index) => {

      const getHeight = (input) => {
       return yScale(0) - yScale(input)
      } 
      let totalColumnWidth = Number(columnWidth) + Number(columnPadding.left) + Number(columnPadding.right)

      return (
        <g key={index}>
        <rect
          key={index}
          x={index * totalColumnWidth}
          height={getHeight(Math.abs(column.value))}
          width={columnWidth}
          y={column.value > 0 ? (yScale(column.value)): yScale(0)}
          fill={column.color}
          className={`fill-color--${column.id}`}
          id={column.id}
        />
        <text x={index * totalColumnWidth + 2} y={
          column.value < 0 ? yScale(0) - 6 : yScale(0) + 20
        }>{column.label}</text>
        </g>
      )
    })}
    <rect x={0} y={yScale(0)} width={chartWidth} height={1} fill={defaultStyles.linecolor} />
  </svg>
  </>)
}

export default ColumnChart
