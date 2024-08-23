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

    const { projection } = frameState.viewState
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
      context.fillStyle = fill.getRgba()
      context.fill()
    }

    if (stroke) {
      context.save()
      this.drawStroke(frameState, context, {
        style: stroke.getRgba(),
        width: stroke.width,
        position: stroke.position,
      })
      context.restore()
    }
  }

  drawPath(geometries, context) {
    this.drawingFunction.context(context)

    context.beginPath()
    for (const geometry of geometries) {
      this.drawingFunction(geometry)
    }
    context.closePath()
  }

  drawStroke(frameState, context, { style, width: strokeWidth, position }) {
    const { projection, transform, pixelRatio } = frameState.viewState
    const scale = transform.k

    if (position === StrokePosition.CENTER) {
      context.lineWidth = (strokeWidth / scale) * pixelRatio
      context.strokeStyle = style
      context.stroke()
      return
    }

    const feature = this.feature
    const [[minX, minY], [maxX, maxY]] = this.getProjectedExtent(projection)
    const x = minX
    const y = minY
    const width = maxX - minX
    const height = maxY - minY

    const strokeContext = this.createCanvas(
      width * scale,
      height * scale,
    ).getContext("2d")

    strokeContext.scale(scale, scale)
    strokeContext.translate(-x, -y)

    strokeContext.lineWidth = Math.round((strokeWidth / scale) * pixelRatio * 2)
    strokeContext.strokeStyle = style

    const geometries = feature.getProjectedGeometries(projection)
    this.drawPath(geometries, strokeContext)

    strokeContext.stroke()

    if (position === StrokePosition.INSIDE) {
      // The existing canvas content is kept where both the new shape and existing canvas content overlap.
      // Everything else is made transparent.
      strokeContext.globalCompositeOperation = "destination-in"
    } else if (position === StrokePosition.OUTSIDE) {
      // The existing content is kept where it doesn't overlap the new shape.
      strokeContext.globalCompositeOperation = "destination-out"
    }

    strokeContext.fill()

    // console.log("line width", (strokeWidth / scale) * pixelRatio * 2)
    // console.log(strokeContext.canvas.toDataURL())

    context.scale(1 / scale, 1 / scale)

    context.drawImage(strokeContext.canvas, x * scale, y * scale)
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
