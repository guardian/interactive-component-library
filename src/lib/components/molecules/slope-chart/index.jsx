import React, { useMemo, useRef, useState, useLayoutEffect } from 'react'
import { positionLabels, scaleLinear } from './slope-chart-util'

export const SlopeChart = ({
  id,
  slopeChartItems,
  padding = { left: 20, right: 24, top: 20, bottom: 16 },
  domain,
  prevValKey,
  nextValKey,
  abbrKey,
  nextLabel,
  prevLabel,
}) => {
  const wrapperRef = useRef(null)
  const [width, setWidth] = useState(0)
  const contentSize = Math.floor(width - padding.left - padding.right)
  const height = contentSize + padding.top + padding.bottom
  const yScale = scaleLinear(domain, [contentSize, 0])
  const show = width > 0

  useLayoutEffect(() => {
    if (width === 0) {
      setWidth(wrapperRef.current.getBoundingClientRect().width)
    }

    const handleResize = () => {
      const newWidth = wrapperRef.current.getBoundingClientRect().width
      if (newWidth !== width) {
        setWidth(newWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  const labeLeftPositions = useMemo(
    () => positionLabels(slopeChartItems, prevValKey, yScale, abbrKey, padding.left - 8, padding.top),
    [width, slopeChartItems],
  )
  const labelRightPositions = useMemo(
    () => positionLabels(slopeChartItems, nextValKey, yScale, abbrKey, padding.left + contentSize + 8, padding.top),
    [width, slopeChartItems],
  )

  return (
    <div class="gv-slope-chart" ref={wrapperRef}>
      {show && (
        <svg id={id} width={width} height={height}>
          {slopeChartItems.map((item) => {
            return (
              <g key={item[abbrKey]}>
                <line
                  x1={padding.left}
                  y1={yScale(item[prevValKey]) + padding.top}
                  x2={padding.left + contentSize}
                  y2={yScale(item[nextValKey]) + padding.top}
                  class={`gv-slope-chart-line stroke-color--${item[abbrKey]}`}
                />
                <circle
                  cx={padding.left}
                  cy={yScale(item[prevValKey]) + padding.top}
                  r={4}
                  class={`gv-slope-chart-circle fill-color--${item[abbrKey]}`}
                />
                <circle
                  cx={padding.left + contentSize}
                  cy={yScale(item[nextValKey]) + padding.top}
                  r={4}
                  class={`gv-slope-chart-circle fill-color--${item[abbrKey]}`}
                />
              </g>
            )
          })}
          {labeLeftPositions.map((item) => {
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
                {prevLabel}
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
