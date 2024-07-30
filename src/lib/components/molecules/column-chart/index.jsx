import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import { scaleLinear } from "d3-scale"

export const ColumnChart = ({
  columns,
  maxValue,
  minValue,
  chartHeight,
  chartWidth,
  columnWidth,
  columnPadding,
  styles,
}) => {
  styles = mergeStyles(defaultStyles, styles)

  const yScale = scaleLinear([maxValue, minValue], [0, chartHeight])
  const totalColumnWidth =
    Number(columnWidth) +
    Number(columnPadding.left) +
    Number(columnPadding.right)
  let marginBottom = minValue < 0 ? 0 : 40

  return (
    <svg width={chartWidth} height={chartHeight + marginBottom}>
      {columns.map((column, index) => {
        const getHeight = (input) => {
          return yScale(0) - yScale(input)
        }

        return (
          <g key={index}>
            <rect
              x={index * totalColumnWidth}
              height={getHeight(Math.abs(column.value))}
              width={columnWidth}
              y={column.value > 0 ? yScale(column.value) : yScale(0)}
              fill={column.color}
              className={`${styles.bar} fill-color--${column.id}`}
              id={column.id}
            />
            <text
              className={styles.text}
              x={index * totalColumnWidth + 2}
              y={column.value < 0 ? yScale(0) - 6 : yScale(0) + 20}
            >
              {column.label}
            </text>
          </g>
        )
      })}
      <rect
        className={styles.axis}
        x={0}
        y={yScale(0)}
        width={chartWidth}
        height={1}
      />
    </svg>
  )
}

export default ColumnChart
