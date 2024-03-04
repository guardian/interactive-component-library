import { useMemo, useRef, useState, useLayoutEffect } from 'preact/hooks'
import { positionLabels, scaleLinear } from './slope-chart-util'
import { useWindowSize } from './react-util'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export const SlopeChart = ({
  id,
  slopeChartItems,
  padding = { left: 20, right: 24, top: 20, bottom: 16 },
  spacing = 8,
  domain,
  previousValueKey,
  nextValueKey,
  abbreviationKey,
  nextLabel,
  previousLabel,
  styles,
}) => {
  const wrapperRef = useRef(null)
  const [width, setWidth] = useState(0)
  const windowSize = useWindowSize()

  const contentWidth = Math.floor(width - padding.left - padding.right)

  const height = contentWidth + padding.top + padding.bottom
  const yScale = scaleLinear(domain, [contentWidth, 0])
  const show = width > 0

  const contentHeight = Math.floor(height - padding.top - padding.bottom)

  useLayoutEffect(() => {
    const newWidth = wrapperRef.current.getBoundingClientRect().width
    setWidth(newWidth)
  }, [windowSize])

  const labelLeftPositions = useMemo(
    () =>
      positionLabels(slopeChartItems, previousValueKey, yScale, abbreviationKey, padding.left - spacing, padding.top),
    [slopeChartItems, previousValueKey, padding, abbreviationKey, yScale, spacing],
  )
  const labelRightPositions = useMemo(
    () =>
      positionLabels(
        slopeChartItems,
        nextValueKey,
        yScale,
        abbreviationKey,
        padding.left + contentWidth + 8,
        padding.top,
      ),
    [slopeChartItems, abbreviationKey, padding, yScale, nextValueKey, contentWidth],
  )

  styles = mergeStyles(defaultStyles, styles)

  return (
    <div ref={wrapperRef}>
      {show && (
        <svg id={id} width={width} height={height}>
          <g transform={`translate(${padding.left} ${padding.top})`}>
            {slopeChartItems.map((item) => {
              const itemStyles = mergeStyles({ ...styles }, item.styles)
              return (
                <g key={item[abbreviationKey]}>
                  <line
                    x1={0}
                    y1={yScale(item[previousValueKey])}
                    x2={contentWidth}
                    y2={yScale(item[nextValueKey])}
                    className={itemStyles.line}
                  />
                  <circle cx={0} cy={yScale(item[previousValueKey])} r={4} className={itemStyles.circle} />
                  <circle cx={contentWidth} cy={yScale(item[nextValueKey])} r={4} className={itemStyles.circle} />
                </g>
              )
            })}
          </g>
          {labelLeftPositions.map((item) => {
            return (
              <g key={`${item.key}-left`}>
                <text x={item.x} y={item.y} className={styles.label} text-anchor="end">
                  {item.value}
                </text>
              </g>
            )
          })}
          {labelRightPositions.map((item) => {
            return (
              <g key={`${item.key}-right`}>
                <text x={item.x} y={item.y} className={styles.label}>
                  <tspan>{item.value}</tspan>
                  <tspan dx="4" className={styles.category}>
                    {item.key}
                  </tspan>
                </text>
              </g>
            )
          })}
          {
            <g transform={`translate(${padding.left} ${padding.top})`}>
              <line x1={0} x2={contentWidth} y1={contentHeight} y2={contentHeight} className={styles.axis} />
              <text x={0} y={contentHeight + spacing / 2} dominant-baseline="hanging" className={styles.label}>
                {previousLabel}
              </text>
              <text
                x={contentWidth}
                y={contentHeight + spacing / 2}
                dominant-baseline="hanging"
                className={styles.label}
                text-anchor="end"
              >
                {nextLabel}
              </text>
            </g>
          }
        </svg>
      )}
    </div>
  )
}

export default SlopeChart
