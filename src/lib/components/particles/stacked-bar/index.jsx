import { useRef, useLayoutEffect } from 'preact/hooks'
import { isDarkColor } from '$headless/colors/index'

export function StackedBar({ stack, width, height, createSVG = true }) {
  const rectElements = useRef([])
  const textElements = useRef([])

  useLayoutEffect(() => {
    for (let index = 0; index < stack.length; index++) {
      const rectElement = rectElements.current[index]
      const textElement = textElements.current[index]

      const paddingX = 8
      const hideText = textElement.getBBox().width + paddingX > rectElement.getBBox().width
      textElement.setAttribute('display', hideText ? 'none' : '')
    }
  }, [stack, width, height])

  let totalWidth = 0
  const content = stack.map((d, index) => {
    const itemWidth = Math.round(d.fraction * width)
    const textColor = isDarkColor(d.fill) ? 'fill-white' : 'fill-neutral-7'
    const value = (
      <g key={index} transform={`translate(${totalWidth}, 0)`}>
        <rect
          ref={(element) => (rectElements.current[index] = element)}
          width={itemWidth}
          height={height}
          fill={d.fill}
          shape-rendering="crispEdges"
        />
        <text
          ref={(element) => (textElements.current[index] = element)}
          class={`font-sans text-xs ${textColor}`}
          x={itemWidth}
          y={height / 2}
          dx={-4}
          text-anchor="end"
          alignment-baseline="central"
          text-rendering="optimizeLegibility"
        >
          {d.label}
        </text>
      </g>
    )
    totalWidth += itemWidth
    return value
  })

  if (createSVG) {
    return (
      <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        {content}
      </svg>
    )
  }

  return <>{content}</>
}
