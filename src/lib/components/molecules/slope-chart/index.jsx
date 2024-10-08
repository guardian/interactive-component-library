import { useMemo, useRef } from "preact/hooks"
import { positionLabels, scaleLinear } from "$shared/helpers/labelsUtil"
import { useContainerSize } from "$shared/hooks/useContainerSize"
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const SlopeChart = ({
  domain,
  lines,
  y1Label = (d) => d.y1,
  y2Label = (d) => d.y2,
  axis,
  styles,
  padding = { left: 24, right: 24, top: 20, bottom: 20 },
  svgId,
}) => {
  const wrapperRef = useRef(null)
  const containerSize = useContainerSize(wrapperRef)
  const width = containerSize ? containerSize.width : 0

  const contentWidth = Math.floor(width - padding.left - padding.right)
  // force 1:1 aspect ratio for chart area
  const contentHeight = contentWidth

  const height = contentHeight + padding.top + padding.bottom
  const yScale = scaleLinear(domain, [contentHeight, 0])
  const show = width > 0

  const y1Labels = useMemo(() => {
    let labels = lines.map((d) => ({ y: yScale(d.y1), value: y1Label(d) }))
    return positionLabels(labels)
  }, [lines, y1Label, yScale])

  const y2Labels = useMemo(() => {
    let labels = lines.map((d) => ({ y: yScale(d.y2), value: y2Label(d) }))
    return positionLabels(labels)
  }, [lines, y2Label, yScale])

  styles = mergeStyles({ ...defaultStyles }, styles)

  const chart = (
    <svg className={styles.svg} width={width} height={height} id={svgId}>
      <g transform={`translate(${padding.left} ${padding.top})`}>
        {/* draw axis */}
        <g transform={`translate(0 ${contentHeight})`}>
          <line
            x1={0}
            x2={contentWidth}
            className={styles.axis}
            shapeRendering="crispEdges"
          />
          <text
            dominantBaseline="hanging"
            className={[styles.label, styles.axisLabel].join(" ")}
          >
            {axis.startLabel}
          </text>
          <text
            x={contentWidth}
            dominantBaseline="hanging"
            textAnchor="end"
            className={[styles.label, styles.axisLabel].join(" ")}
          >
            {axis.endLabel}
          </text>
        </g>

        {/* draw lines */}
        {lines.map((line, index) => {
          const itemStyles = mergeStyles({ ...styles }, line.styles)
          return (
            <g key={index}>
              <line
                x1={0}
                y1={yScale(line.y1)}
                x2={contentWidth}
                y2={yScale(line.y2)}
                className={`${itemStyles.lineWhite}`}
              />
              <line
                x1={0}
                y1={yScale(line.y1)}
                x2={contentWidth}
                y2={yScale(line.y2)}
                className={`${itemStyles.line} stroke-color--${line.abbreviation}`}
              />
              <circle
                cx={0}
                cy={yScale(line.y1)}
                r={4}
                className={`${itemStyles.circle} fill-color--${line.abbreviation}`}
              />
              <circle
                cx={contentWidth}
                cy={yScale(line.y2)}
                r={4}
                className={`${itemStyles.circle} fill-color--${line.abbreviation}`}
              />
            </g>
          )
        })}

        {/* draw labels */}
        {y1Labels.map((label, index) => {
          return (
            <g key={index}>
              <text
                x={0}
                y={label.y}
                className={[styles.label, styles.y1Label].join(" ")}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {label.value}
              </text>
            </g>
          )
        })}
        {y2Labels.map((label, index) => {
          return (
            <g key={index}>
              <text
                x={contentWidth}
                y={label.y}
                className={[styles.label, styles.y2Label].join(" ")}
                textAnchor="start"
                dominantBaseline="middle"
              >
                {label.value}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )

  return (
    <div className={styles.slopeChartContainer} ref={wrapperRef}>
      {show && chart}
    </div>
  )
}

export default SlopeChart
