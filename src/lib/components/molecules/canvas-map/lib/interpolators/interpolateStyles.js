import { Style, Fill, Stroke } from "../styles"

export function interpolateStyles(
  firstStyle,
  secondStyle,
  interpolateColors,
  interpolateNumbers,
) {
  const fillInterpolator = interpolateFill(
    firstStyle.fill,
    secondStyle.fill,
    interpolateColors,
    interpolateNumbers,
  )
  const strokeInterpolator = interpolateStroke(
    firstStyle.stroke,
    secondStyle.stroke,
    interpolateColors,
    interpolateNumbers,
  )

  return (t) => {
    return new Style({
      fill: fillInterpolator(t),
      stroke: strokeInterpolator(t),
    })
  }
}

export function interpolateFill(
  fillA,
  fillB,
  interpolateColors,
  interpolateNumbers,
) {
  const colorInterpolator = interpolateColors(
    fillA?.color ?? "transparent",
    fillB?.color ?? "transparent",
  )
  const opacityInterpolator = interpolateNumbers(
    fillA?.opacity ?? 1,
    fillB?.opacity ?? 1,
  )

  return (t) => {
    return new Fill({
      color: colorInterpolator(t),
      opacity: opacityInterpolator(t),
    })
  }
}

export function interpolateStroke(
  strokeA,
  strokeB,
  interpolateColors,
  interpolateNumbers,
) {
  const colorInterpolator = interpolateColors(
    strokeA?.color ?? "transparent",
    strokeB?.color ?? "transparent",
  )
  const opacityInterpolator = interpolateNumbers(
    strokeA?.opacity ?? 1,
    strokeB?.opacity ?? 1,
  )
  const widthInterpolator = interpolateNumbers(
    strokeA?.width ?? 1,
    strokeB?.width ?? 1,
  )

  return (t) => {
    return new Stroke({
      color: colorInterpolator(t),
      opacity: opacityInterpolator(t),
      width: widthInterpolator(t),
    })
  }
}
