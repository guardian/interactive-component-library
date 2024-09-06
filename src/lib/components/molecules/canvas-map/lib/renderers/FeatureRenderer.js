import { geoPath } from "d3-geo"
import { generateDebugUrl, validateGeometries } from "../util/debug"
import { StrokePosition } from "../styles"
import { combineExtents } from "../util/extent"

export class FeatureRenderer {
  constructor() {
    this.drawingFunction = geoPath()
  }

  setStyle(style) {
    this.style = style
  }

  setFeature(feature) {
    this.feature = feature
  }

  render(frameState, context) {
    if (!this.style) {
      return
    }

    const feature = this.feature

    const { projection, transform, pixelRatio } = frameState.viewState
    const { stroke, fill } = this.style

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
    this.drawPath(geometries, context)

    if (fill) {
      fill.drawInContext(context, transform.k)
    }

    if (stroke) {
      context.save()
      this.drawStroke(frameState, context, {
        style: stroke.getRgba(),
        width: (stroke.width / transform.k) * pixelRatio,
        position: stroke.position,
      })
      context.restore()
    }
  }

  drawPath(geometries, context, clipPath = false) {
    this.drawingFunction.context(context)

    context.beginPath()
    for (const geometry of geometries) {
      this.drawingFunction(geometry)
    }

    if (clipPath) {
      context.clip()
    } else {
      context.closePath()
    }
  }

  drawStroke(frameState, context, { style, width: strokeWidth, position }) {
    const { projection } = frameState.viewState

    context.lineWidth = strokeWidth
    context.strokeStyle = style

    if (position === StrokePosition.INSIDE) {
      // Double stroke width for inside stroke
      context.lineWidth = strokeWidth * 2

      // Draw clip path to mask the part of the stroke outside of the shape
      const geometries = this.feature.getProjectedGeometries(projection)
      this.drawPath(geometries, context, true)
    }

    context.stroke()
  }

  createCanvas(width, height) {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    return canvas
  }

  getProjectedExtent(projection) {
    const geometries = this.feature.getProjectedGeometries(projection)

    const extent = geometries.reduce((combinedExtent, geometry) => {
      const bounds = this.drawingFunction.bounds(geometry)
      if (!combinedExtent) return bounds
      return combineExtents(bounds, combinedExtent)
    }, null)
    return extent
  }
}
