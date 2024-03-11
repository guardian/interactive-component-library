import { useMemo, useRef, useState, useLayoutEffect } from 'preact/hooks'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'
// import { scaleLinear } from 'd3-scale'
import { scaleLinear } from './column-chart-util'

export const ColumnChart = ({
  columns,
  domain,
  chartHeight,
  columnWidth,
  // styles = {},
}) => {
 
  const yScale = scaleLinear(domain, [0, chartHeight])

  return (
    <>
  <svg width={chartHeight} height={chartHeight} style="background-color:lightgrey; overlow: visible">
    {columns.map((column, index) => {

      console.log(yScale(column.value))

      return (
        <rect
          key={index}
          x={index * columnWidth}
          height={yScale(Math.abs(column.value))}
          width={columnWidth}
          y={yScale(column.value) > 0 ? yScale(column.value) - yScale(0) : yScale(0)}
          fill={column.color}
          id={column.id}
        />
      )
    })}
    <rect x={0} y={yScale(0)} width={chartHeight} height={1} fill="black" />
  </svg>
  </>)
}

export default ColumnChart
