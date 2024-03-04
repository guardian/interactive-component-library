import { useMemo, useRef, useState, useLayoutEffect } from 'preact/hooks'
import { positionLabels, scaleLinear } from './slope-chart-util'
import { useWindowSize } from './react-util'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const SlopeChart = ({
  id,
  domain,
  lines,
  y1Label = (d) => d.y1,
  y2Label = (d) => d.y2,
  axis,
  styles,
  padding = { left: 24, right: 24, top: 20, bottom: 20 },
}) => {
  const wrapperRef = useRef(null)
  const windowSize = useWindowSize()
  const [width, setWidth] = useState(0)

  const contentWidth = Math.floor(width - padding.left - padding.right)
  // force 1:1 aspect ratio for chart area
  const contentHeight = contentWidth

  const height = contentHeight + padding.top + padding.bottom
  const yScale = scaleLinear(domain, [contentHeight, 0])
  const show = width > 0

  useLayoutEffect(() => {
    const newWidth = wrapperRef.current.getBoundingClientRect().width
    setWidth(newWidth)
  }, [windowSize])

  const y1Labels = useMemo(() => {
    let labels = lines.map((d) => ({ y: yScale(d.y1), value: y1Label(d) }))
    return positionLabels(labels)
  }, [lines, y1Label, yScale])

  const y2Labels = useMemo(() => {
    let labels = lines.map((d) => ({ y: yScale(d.y2), value: y2Label(d) }))
    return positionLabels(labels)
  }, [lines, y2Label, yScale])

  styles = mergeStyles(defaultStyles, styles)

  const chart = (
    <svg id={id} width={width} height={height}>
      <g transform={`translate(${padding.left} ${padding.top})`}>
        {/* draw axis */}
        <g transform={`translate(0 ${contentHeight})`}>
          <line x1={0} x2={contentWidth} className={styles.axis} shape-rendering="crispEdges" />
          <text dominant-baseline="hanging" className={[styles.label, styles.axisLabel].join(' ')}>
            {axis.startLabel}
          </text>
          <text
            x={contentWidth}
            dominant-baseline="hanging"
            text-anchor="end"
            className={[styles.label, styles.axisLabel].join(' ')}
          >
            {axis.endLabel}
          </text>
        </g>

        {/* draw lines */}
        {lines.map((line, index) => {
          const itemStyles = mergeStyles({ ...styles }, line.styles)
          return (
            <g key={index}>
              <line x1={0} y1={yScale(line.y1)} x2={contentWidth} y2={yScale(line.y2)} className={itemStyles.line} />
              <circle cx={0} cy={yScale(line.y1)} r={4} className={itemStyles.circle} />
              <circle cx={contentWidth} cy={yScale(line.y2)} r={4} className={itemStyles.circle} />
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
                className={[styles.label, styles.y1Label].join(' ')}
                text-anchor="end"
                dominant-baseline="middle"
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
                className={[styles.label, styles.y2Label].join(' ')}
                text-anchor="start"
                dominant-baseline="middle"
              >
                {label.value}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )

  return <div ref={wrapperRef}>{show && chart}</div>
}

export default SlopeChart
