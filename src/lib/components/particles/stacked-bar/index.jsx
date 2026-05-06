import { useRef, useMemo, useCallback } from "preact/hooks"
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

export function StackedBar({
  stack,
  width,
  height,
  hideLabels = false,
  labelType = LabelType.inline,
  showBackgroundRect = false,
  createSVG = true,
  labelOverlapConfig = LabelOverlapConfig,
  border = false,
  styles,
}) {
  const rectElements = useRef([])
  const textElements = useRef([])

  const isLabelHidden = useCallback(
    (label) => {
      if (typeof hideLabels === "function") {
        return hideLabels(label)
      }
      return !!hideLabels
    },
    [hideLabels],
  )

  const allLabelsHidden = useMemo(() => {
    if (typeof hideLabels === "function") {
      return stack.every((d) => hideLabels(d.label))
    }
    return !!hideLabels
  }, [stack, hideLabels])

  styles = mergeStyles({ ...defaultStyles }, styles)
  const svgHeight =
    labelType === LabelType.hanging && !allLabelsHidden ? height + 20 : height

  // no secondary colors used for borders, so eg: 'lab-2' should be converted to 'lab'
  const cleanBorderAbbr = (abbrText) => abbrText.split("-")[0]

  const renderLabel = (config, i) => (
    <text
      key={`label-${i}`}
      ref={(element) => (textElements.current[i] = element)}
      textRendering="optimizeLegibility"
      className={`${styles.label} ${
        config.hasStroke ? styles.labelStroke : ""
      }`}
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
          className={`${styles.bar} fill-color--${d.abbreviation} ${
            border && "stroke-color--" + cleanBorderAbbr(d.abbreviation)
          }`}
          style={{ fill: d.fill }}
          shapeRendering="crispEdges"
        />
        {labelType === LabelType.inline &&
          !isLabelHidden(d.label) &&
          renderLabel(labelConfig, index)}
      </g>
    )

    totalWidth += itemWidth
    return value
  })

  const hangingLabelConfig = useMemo(() => {
    let totalW = 0
    const labels = []

    stack.forEach((d) => {
      const itemWidth = d.fraction * width

      if (!isLabelHidden(d.label)) {
        labels.push({
          x: itemWidth + totalW,
          y: height + 4,
          value: d.label,
          textAnchor: "end",
          dominantBaseline: "hanging",
        })
      }

      totalW += itemWidth
    })

    return preventOverlap(
      labels,
      0,
      labelOverlapConfig.labelSize,
      "x",
      labelOverlapConfig.moveBothLabels,
    )
  }, [stack, height, width, labelOverlapConfig, isLabelHidden])

  const strokedHangingLabelConfig = useMemo(
    () => [...hangingLabelConfig].map((l) => ({ ...l, hasStroke: true })),
    [hangingLabelConfig],
  )

  const backgroundRect = (
    <g>
      <rect
        x="0"
        y="0"
        height={height}
        width={width}
        className={styles.backgroundRect}
      />
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
        <g>
          {content}
          {labelType === LabelType.hanging &&
            !allLabelsHidden &&
            strokedHangingLabelConfig.map((config, i) =>
              renderLabel(config, i),
            )}
          {labelType === LabelType.hanging &&
            !allLabelsHidden &&
            hangingLabelConfig.map((config, i) => renderLabel(config, i))}
        </g>
      </svg>
    )
  }

  return (
    <g>
      {content}
      {labelType === LabelType.hanging &&
        !allLabelsHidden &&
        hangingLabelConfig.map((config, i) => renderLabel(config, i))}
    </g>
  )
}
