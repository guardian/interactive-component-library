import { useRef } from 'preact/hooks'
import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles'
import { configLabel, positionLabels } from './stackedBarUtil'


const configLabel = (labelType, itemWidth, barHeight) => {
  if (labelType === 'inline') {
    return {
      x: itemWidth - 4,
      y: barHeight / 2,
      textAnchor: 'end',
      alignmentBaseline: 'central',
    }
  }

  if (labelType === 'bottom') {
    return {
      x: itemWidth,
      y: barHeight + 4,
      textAnchor: 'end',
      alignmentBaseline: 'hanging',
    }
  }
}

const hangingLabels = useMemo(() => {
  let labels = stack.map((d) => {
    const itemWidth = d.fraction * width
    return { x: itemWidth, value: y1Label(d) }
  })
  return positionLabels(labels)
}, [lines, y1Label, yScale])



export function StackedBar({
  stack,
  width,
  height,
  hideLabels = false,
  labelType = 'bottom',
  showBackgroundRect = false,
  createSVG = true,
  styles,
}) {
  const rectElements = useRef([])
  const textElements = useRef([])

  styles = mergeStyles({ ...defaultStyles }, styles)
  const svgHeight = labelType === 'bottom' ? height + 20 : height
  let totalWidth = 0
  const content = stack.map((d, index) => {
    const itemWidth = d.fraction * width
    const labelConfig = configLabel(labelType, itemWidth, height)

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
        {!hideLabels && (
          <text
            ref={(element) => (textElements.current[index] = element)}
            text-rendering="optimizeLegibility"
            className={styles.label}
            style={{ display: hideLabels ? 'hidden' : 'visible' }} // using visibility rather than display makes sure the text width is always calculated correctly
            {...labelConfig}
          >
            {d.label}
          </text>
        )}
      </g>
    )

    totalWidth += itemWidth
    return value
  })

  const backgroundRect = (
    <g>
      <rect x="0" y="0" height={height} width={width} className={styles.backgroundRect} />
    </g>
  )

  if (createSVG) {
    return (
      <svg
        overflow="hidden"
        width={width}
        height={svgHeight}
        viewBox={`0 0 ${width} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {showBackgroundRect && backgroundRect}
        {content}
      </svg>
    )
  }

  return <>{content}</>
}
