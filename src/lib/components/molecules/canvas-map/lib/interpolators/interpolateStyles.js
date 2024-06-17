import { Style, Fill, Stroke } from "../styles"

export function interpolateStyles(firstStyle, secondStyle, interpolateColors) {
  const fillInterpolator = interpolateFill(firstStyle.fill, secondStyle.fill, interpolateColors)
  const strokeInterpolator = interpolateStroke(firstStyle.stroke, secondStyle.stroke, interpolateColors)

  return (t) => {
    return new Style({
      fill: fillInterpolator(t),
      stroke: strokeInterpolator(t),
    })
  }
}

export function interpolateFill(fillA, fillB, interpolateColors) {
  const colorInterpolator = interpolateColors(fillA?.color || "transparent", fillB?.color || "transparent")

  return (t) => {
    return new Fill({
      color: colorInterpolator(t),
    })
  }
}

export function interpolateStroke(strokeA, strokeB, interpolateColors) {
  const colorInterpolator = interpolateColors(strokeA?.color || "transparent", strokeB?.color || "transparent")
  const widthInterpolator = (t) => {
    const widthA = strokeA?.width || 0
    const widthB = strokeB?.width || 0
    const diff = widthB - widthA
    return widthA + diff * t
  }

  return (t) => {
    return new Stroke({
      color: colorInterpolator(t),
      width: widthInterpolator(t),
    })
  }
}
