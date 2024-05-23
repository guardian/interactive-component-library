import { useRef, useMemo } from "preact/hooks"
import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"
import { preventOverlap } from "$shared/helpers/labelsUtil"

export const LabelType = {
  hanging: "hanging",
  inline: "inline",
}

export const LabelOverlapConfig = {
  labelSize: 20,
  moveBothLabels: false,
}

export function StackedBar({ stack, width, height, hideLabels = false, labelType = LabelType.inline, showBackgroundRect = false, createSVG = true, styles, labelOverlapConfig = LabelOverlapConfig }) {
  const rectElements = useRef([])
  const textElements = useRef([])

  styles = mergeStyles({ ...defaultStyles }, styles)
  const svgHeight = labelType === LabelType.hanging && !hideLabels ? height + 20 : height

  const renderLabel = (config, i) => (
    <text
      key={`label-${i}`}
      ref={(element) => (textElements.current[i] = element)}
      text-rendering="optimizeLegibility"
      className={styles.label}
      style={{ display: "visible" }} // using visibility rather than display makes sure the text width is always calculated correctly
      x={config.x}
      y={config.y}
      textAnchor={config.textAnchor}
      dominantBaseline={config.dominantBaseline}
    >
      {config.value}
    </text>
  )

  let totalWidth = 0
  const content = stack.map((d, index) => {
    const itemWidth = d.fraction * width

    const labelConfig = {
      value: d.label,
      x: itemWidth - 4,
      y: height / 2,
      textAnchor: "end",
      dominantBaseline: "middle",
    }

    const value = (
      <g transform={`translate(${totalWidth}, 0)`} key={index}>
        <rect
          ref={(element) => (rectElements.current[index] = element)}
          width={itemWidth}
          height={height}
          className={`${styles.bar} fill-color--${d.abbreviation}`}
          style={{ fill: d.fill }}
          shape-rendering="crispEdges"
        />
        {labelType === LabelType.inline && !hideLabels && renderLabel(labelConfig, index)}
      </g>
    )

    totalWidth += itemWidth
    return value
  })

  const hangingLabelConfig = useMemo(() => {
    let totalW = 0
    let labels = stack.map((d) => {
      const itemWidth = d.fraction * width

      const labelConfig = { x: itemWidth + totalW, y: height + 4, value: d.label, textAnchor: "end", dominantBaseline: "hanging" }

      totalW += itemWidth
      return labelConfig
    })

    return preventOverlap(labels, 0, labelOverlapConfig.labelSize, "x", labelOverlapConfig.moveBothLabels)
  }, [stack, height, width])

  const backgroundRect = (
    <g>
      <rect x="0" y="0" height={height} width={width} className={styles.backgroundRect} />
    </g>
  )

  if (createSVG) {
    return (
      <svg overflow="hidden" width={width} height={svgHeight} viewBox={`0 0 ${width} ${svgHeight}`} xmlns="http://www.w3.org/2000/svg">
        {showBackgroundRect && backgroundRect}
        <g>
          {content}
          {labelType === LabelType.hanging && !hideLabels && hangingLabelConfig.map((config, i) => renderLabel(config, i))}
        </g>
      </svg>
    )
  }

  return (
    <g>
      {content}
      {labelType === LabelType.hanging && !hideLabels && hangingLabelConfig.map((config, i) => renderLabel(config, i))}
    </g>
  )
}
