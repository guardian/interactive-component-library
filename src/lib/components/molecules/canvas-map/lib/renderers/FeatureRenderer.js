import { geoPath } from "d3-geo"

export class FeatureRenderer {
  constructor() {
    this.drawingFunction = geoPath()
  }

  setStyle(style) {
    this.style = style
  }

  render(frameState, feature, context) {
    const { projection, transform } = frameState.viewState

    this.drawingFunction.context(context)

    context.beginPath()

    const geometries = feature.getProjectedGeometries(projection)
    for (const geometry of geometries) {
      this.drawingFunction(geometry)
    }

    const { stroke, fill } = this.style

    if (stroke) {
      context.lineWidth = stroke.width / transform.k
      context.strokeStyle = stroke.color
      context.stroke()
    }

    if (fill) {
      context.fillStyle = fill.color
      context.fill()
    }
  }
}
