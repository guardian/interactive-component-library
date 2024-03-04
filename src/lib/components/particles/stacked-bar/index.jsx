import { useRef, useLayoutEffect, useState } from 'preact/hooks'
import { isDarkColor } from '$shared/colors'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function StackedBar({ stack, width, height, createSVG = true, styles }) {
  const rectElements = useRef([])
  const textElements = useRef([])
  const [hideLabels, setHideLabels] = useState(true)

  useLayoutEffect(() => {
    for (let index = 0; index < stack.length; index++) {
      const rectElement = rectElements.current[index]
      const textElement = textElements.current[index]

      const paddingX = 8
      const hideText = textElement.getBBox().width + paddingX > rectElement.getBBox().width

      if (hideText) {
        // if any is too big, hide all and break
        setHideLabels(true)
        return
      }
    }

    // if all fit, show all after loop ends
    setHideLabels(false)
  }, [stack, width, height])

  styles = mergeStyles({ ...defaultStyles }, styles)

  let totalWidth = 0
  const content = stack.map((d, index) => {
    const itemWidth = d.fraction * width
    const textColor = isDarkColor(d.fill) ? '#FFF' : '#121212'
    const value = (
      <g key={index} transform={`translate(${totalWidth}, 0)`}>
        <rect
          ref={(element) => (rectElements.current[index] = element)}
          width={itemWidth}
          height={height}
          className={styles.bar}
          style={{ fill: d.fill }}
          shape-rendering="crispEdges"
        />
        <text
          ref={(element) => (textElements.current[index] = element)}
          x={itemWidth - 4}
          y={height / 2}
          text-anchor="end"
          alignment-baseline="central"
          text-rendering="optimizeLegibility"
          className={styles.label}
          style={{ fill: textColor, visibility: hideLabels ? 'hidden' : 'visible' }} //using visibility rather than display makes sure the text width is always calculated correctly
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
      <svg
        overflow="hidden"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {content}
      </svg>
    )
  }

  return <>{content}</>
}
