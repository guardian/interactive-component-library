import { useContext, useRef, useState, useEffect, useCallback } from "preact/hooks"
import { select } from "d3-selection"
import { geoPath } from "d3-geo"
import { MapContext } from "../context/MapContext"
import { CompositionBorders } from "../layers/CompositionBorders"
import { useZoom } from "../hooks/useZoom"
import { useSignalEffect } from "@preact/signals"
import { forwardRef } from "preact/compat"

export const CanvasRenderer = forwardRef(({ children }, ref) => {
  const canvasRef = useRef()
  const context = useContext(MapContext)
  const { zoomBehaviour, transform, fitBounds } = useZoom({
    ...context.zoom,
  })

  const [drawingFunctions, setDrawingFunctions] = useState([])
  const [pendingUpdate, setPendingUpdate] = useState(false)
  const [path, setPath] = useState()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d", { alpha: false })
    setPath(() => geoPath(context.projection, ctx))
  }, [context.projection])

  useEffect(() => {
    if (canvasRef.current && zoomBehaviour) {
      const element = select(canvasRef.current)
      element.call(zoomBehaviour)
    }
  }, [canvasRef, zoomBehaviour])

  useSignalEffect(() => {
    const feature = context.selectedFeature?.value
    if (feature) {
      fitBounds(path.bounds(feature), context.sizeInPixels)
    }
  })

  const update = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    ctx.save()
    ctx.clearRect(0, 0, context.sizeInPixels.width, context.sizeInPixels.height)

    ctx.save()
    // draw white bg
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, context.sizeInPixels.width, context.sizeInPixels.height)
    ctx.restore()

    ctx.translate(transform.x, transform.y)
    ctx.scale(transform.k, transform.k)

    // set defaults
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    for (const drawMapElement of drawingFunctions) {
      ctx.save()
      drawMapElement(ctx, path, transform)
      ctx.restore()
    }

    ctx.restore()

    setPendingUpdate(false)
  }, [path, transform, context.sizeInPixels, drawingFunctions])

  useEffect(() => {
    setPendingUpdate(true)
  }, [transform])

  useEffect(() => {
    let frameId
    if (pendingUpdate) {
      frameId = requestAnimationFrame(update)
    }

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
    }
  }, [pendingUpdate, update])

  const { width, height } = context.size
  const { sizeInPixels } = context

  function register(draw) {
    setDrawingFunctions((current) => [...current, draw])
  }

  function unregister(draw) {
    setDrawingFunctions((current) => current.splice(current.indexOf(draw), 1))
  }

  function invalidate() {
    if (pendingUpdate) return
    setPendingUpdate(true)
  }

  const zoomIn = useCallback(() => {
    const element = select(canvasRef.current)
    element.transition().duration(500).call(zoomBehaviour.scaleBy, 2)
  })

  const zoomOut = useCallback(() => {
    const element = select(canvasRef.current)
    element.transition().duration(500).call(zoomBehaviour.scaleBy, 0.5)
  })

  const canvasContext = {
    ...context,
    path,
    register,
    unregister,
    invalidate,
    zoomIn,
    zoomOut,
  }

  ref.current = canvasContext

  return (
    <canvas ref={canvasRef} id={context.id} width={sizeInPixels.width} height={sizeInPixels.height} style={{ width, height }}>
      <MapContext.Provider value={canvasContext}>
        {children}
        {context.config.drawCompositionBorders && Object.prototype.hasOwnProperty.call(context.config.projection, "getCompositionBorders") && <CompositionBorders />}
      </MapContext.Provider>
    </canvas>
  )
})
