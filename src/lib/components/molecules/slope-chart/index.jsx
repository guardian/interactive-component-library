import React, { useMemo, useRef, useState, useLayoutEffect } from 'react'
import { positionLabels, scaleLinear } from './slope-chart-util'
import { useWindowSize } from './react-util'

export const SlopeChart = ({
  id,
  slopeChartItems,
  padding = { left: 20, right: 24, top: 20, bottom: 16 },
  domain,
  previousValueKey,
  nextValueKey,
  abbreviationKey,
  nextLabel,
  previousLabel,
}) => {
  const wrapperRef = useRef(null)
  const [width, setWidth] = useState(0)
  const windowSize = useWindowSize()
  const contentSize = Math.floor(width - padding.left - padding.right)
  const height = contentSize + padding.top + padding.bottom
  const yScale = scaleLinear(domain, [contentSize, 0])
  const show = width > 0

  useLayoutEffect(() => {
    const newWidth = wrapperRef.current.getBoundingClientRect().width

    if (newWidth !== width) {
      setWidth(newWidth)
    }
  }, [windowSize])

  const labelLeftPositions = useMemo(
    () => positionLabels(slopeChartItems, previousValueKey, yScale, abbreviationKey, padding.left - 8, padding.top),
    [width, slopeChartItems],
  )
  const labelRightPositions = useMemo(
    () =>
      positionLabels(
        slopeChartItems,
        nextValueKey,
        yScale,
        abbreviationKey,
        padding.left + contentSize + 8,
        padding.top,
      ),
    [width, slopeChartItems],
  )

  return (
    <div ref={wrapperRef}>
      {show && (
        <svg id={id} width={width} height={height}>
          {slopeChartItems.map((item) => {
            return (
              <g key={item[abbreviationKey]}>
                <line
                  x1={padding.left}
                  y1={yScale(item[previousValueKey]) + padding.top}
                  x2={padding.left + contentSize}
                  y2={yScale(item[nextValueKey]) + padding.top}
                  class={`gv-slope-chart-line stroke-color--${item[abbreviationKey]}`}
                />
                <circle
                  cx={padding.left}
                  cy={yScale(item[previousValueKey]) + padding.top}
                  r={4}
                  class={`gv-slope-chart-circle fill-color--${item[abbreviationKey]}`}
                />
                <circle
                  cx={padding.left + contentSize}
                  cy={yScale(item[nextValueKey]) + padding.top}
                  r={4}
                  class={`gv-slope-chart-circle fill-color--${item[abbreviationKey]}`}
                />
              </g>
            )
          })}
          {labelLeftPositions.map((item) => {
            return (
              <g key={item.key + '-left'}>
                <text x={item.x} y={item.y} textAnchor="end" class="gv-slope-chart-text">
                  {item.value}
                </text>
              </g>
            )
          })}
          {labelRightPositions.map((item) => {
            return (
              <g key={item.key + '-right'}>
                <text x={item.x} y={item.y} class="gv-slope-chart-text">
                  {item.value} {item.key}
                </text>
              </g>
            )
          })}
          {
            <g>
              <text x={padding.left} y={height}>
                {previousLabel}
              </text>
              <text x={width - padding.right} y={height} textAnchor="end">
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
