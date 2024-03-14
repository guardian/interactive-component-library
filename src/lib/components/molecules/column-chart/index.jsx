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
  columnWidth,
  // styles = {},
}) => {
 
  const yScale = scaleLinear([maxValue,minValue], [0, chartHeight])

  return (
    <>
  <svg width={chartHeight} height={chartHeight} style="">
    {columns.map((column, index) => {

      const getHeight = (input) => {
       return yScale(0) - yScale(input)
      } 

      return (
        <g key={index}>
        <rect
          key={index}
          x={index * columnWidth}
          height={getHeight(Math.abs(column.value))}
          width={columnWidth}
          y={column.value > 0 ? (yScale(column.value)): yScale(0)}
          fill={column.color}
          id={column.id}
        />
        {/* <text x={index * 2 * columnWidth} y="20">V: {column.value}</text>
        <text x={index * 2 * columnWidth} y="40">P: {getHeight(column.value)}</text> */}
        </g>
      )
    })}
    <rect x={0} y={yScale(0)} width={chartHeight} height={1} fill="black" />
  </svg>
  </>)
}

export default ColumnChart
