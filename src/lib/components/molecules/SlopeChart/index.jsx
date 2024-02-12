import React, { useEffect, useMemo, useRef, useState } from 'react'

function scaleLinear(domain, range) {
  const [domainMin, domainMax] = domain
  const [rangeMin, rangeMax] = range

  const slope = (rangeMax - rangeMin) / (domainMax - domainMin)
  const intercept = rangeMin - slope * domainMin

  return function (x) {
    return slope * x + intercept
  }
}

const labelHeight = 12
const maxIterations = 10

function preventOverlap(labelPositions, iteration = 0) {
  let totalOverlap = 0

  for (let index = 1; index < labelPositions.length; index++) {
    const previousElement = labelPositions[index - 1]
    const element = labelPositions[index]

    const overlap = previousElement.y - (element.y - labelHeight)
    if (overlap < 0) {
      // no overlap, continue
      continue
    }

    previousElement.y -= overlap / 2
    element.y += overlap / 2

    totalOverlap += overlap
  }

  if (totalOverlap > 0 && iteration < maxIterations) {
    return preventOverlap(labelPositions, iteration + 1)
  }

  return labelPositions
}

function positionLabels(items, key, yScale, abbrKey, x, paddingTop) {
  // deduplicate values
  const deduplicated = [...items.reduce((map, obj) => map.set(obj[key], obj), new Map()).values()]

  const initialPositions = deduplicated.map((item) => {
    return {
      x,
      y: yScale(item[key]) + paddingTop + 4,
      value: item[key],
      key: item[abbrKey],
    }
  })
  // sort by y-position
  initialPositions.sort((a, b) => a.y - b.y)

  return preventOverlap(initialPositions)
}

export const SlopeChart = ({
  id,
  slopeChartItems,
  padding = { left: 20, right: 24, top: 20, bottom: 16 },
  domain,
  prevValKey,
  nextValKey,
  abbrKey,
  nextTime,
  prevTime,
}) => {
  const wrapperRef = useRef(null)
  const [width, setWidth] = useState(0)
  const contentSize = Math.floor(width - padding.left - padding.right)
  const height = contentSize + padding.top + padding.bottom
  const yScale = scaleLinear(domain, [contentSize, 0])
  const show = width > 0

  useEffect(() => {
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
  }, [])

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
                {prevTime}
              </text>
              <text x={width - padding.right} y={height} textAnchor="end">
                {nextTime}
              </text>
            </g>
          }
        </svg>
      )}
    </div>
  )
}

export default SlopeChart
