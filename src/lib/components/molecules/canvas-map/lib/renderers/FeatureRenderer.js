import { geoPath } from "d3-geo"
import { generateDebugUrl, validateGeometries } from "../util/debug"

export class FeatureRenderer {
  constructor() {
    this.drawingFunction = geoPath()
  }

  setStyle(style) {
    this.style = style
  }

  render(frameState, feature, context) {
    if (!this.style) {
      return
    }

    const { projection, transform, pixelRatio } = frameState.viewState
    const { stroke, fill } = this.style

    this.drawingFunction.context(context)

    context.beginPath()

    const geometries = feature.getProjectedGeometries(projection)
    if (frameState.debug) {
      try {
        validateGeometries(geometries)
      } catch {
        console.error(
          `Invalid geometry. Feature skipped during rendering. Click here to inspect geometry: ${generateDebugUrl(feature)} \n`,
          feature,
        )
      }
    }
    for (const geometry of geometries) {
      this.drawingFunction(geometry)
    }

    if (fill) {
      context.fillStyle = fill.getRgba()
      context.fill()
    }

    if (stroke) {
      context.lineWidth = (stroke.width * pixelRatio) / transform.k
      context.strokeStyle = stroke.getRgba()
      context.stroke()
    }
  }
}
