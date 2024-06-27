import { geoPath } from "d3-geo"

export class FeatureRenderer {
  constructor() {
    this.drawingFunction = geoPath()
  }

  setStyle(style) {
    this.style = style
  }

  render(frameState, feature, context) {
    const { projection, transform, pixelRatio } = frameState.viewState

    this.drawingFunction.context(context)

    context.beginPath()

    const geometries = feature.getProjectedGeometries(projection)
    for (const geometry of geometries) {
      this.drawingFunction(geometry)
    }

    const { stroke, fill } = this.style

    if (stroke) {
      context.save()
      context.globalAlpha = stroke.opacity
      context.lineWidth = (stroke.width * pixelRatio) / transform.k
      context.strokeStyle = stroke.color
      context.stroke()
      context.restore()
    }

    if (fill) {
      context.save()
      context.globalAlpha = fill.opacity
      context.fillStyle = fill.color
      context.fill()
      context.restore()
    }
  }
}
