import { useRef, useLayoutEffect, useState } from 'preact/hooks'
import { isDarkColor } from '$shared/colors'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function StackedBar({ stack, width, height, showBackgroundRect = false, createSVG = true, styles }) {
  const rectElements = useRef([])
  const textElements = useRef([])
  const [hideLabels, setHideLabels] = useState(true)

  useLayoutEffect(() => {
    
    for (let index = 0; index < stack.length; index++) {
      const rectElement = rectElements.current[index]
      const textElement = textElements.current[index]

      const paddingX = 8
      const hideText = textElement.getBBox().width + paddingX > rectElement.getBBox().width

      const rectStyle = window.getComputedStyle(rectElement)
      const rectColor = rectStyle.getPropertyValue('fill')
      const textColor = isDarkColor(rectColor) ? '#FFF' : '#121212'
      textElement.style.fill = textColor


      if (hideText) {
        // if any are too big, hide all and break
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

    const value = (
      <g key={index} transform={`translate(${totalWidth}, 0)`}>
        <rect
          ref={(element) => (rectElements.current[index] = element)}
          width={itemWidth}
          height={height}
          className={`${styles.bar} fill-color--${d.abbreviation}`}
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
          style={{  visibility: hideLabels ? 'hidden' : 'visible' }} //using visibility rather than display makes sure the text width is always calculated correctly
        >
          {d.label}
        </text>
      </g>
    )

    totalWidth += itemWidth
    return value
  })

  const backgroundRect = <g><rect x="0" y="0" height={height} width={width} className={styles.backgroundRect} /></g>
  
  if (createSVG) {
    return (
      <svg
        overflow="hidden"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {showBackgroundRect && backgroundRect}
        {content}
      </svg>
    )
  }

  return <>{content}</>
}
