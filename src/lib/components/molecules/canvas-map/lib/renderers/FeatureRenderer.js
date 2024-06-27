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
      context.lineWidth = (stroke.width * pixelRatio) / transform.k
      context.strokeStyle = stroke.getRgba()
      context.stroke()
    }

    if (fill) {
      context.fillStyle = fill.getRgba()
      context.fill()
    }
  }
}
