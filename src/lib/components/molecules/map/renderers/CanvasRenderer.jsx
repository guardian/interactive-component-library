import { useContext, useRef, useState, useEffect, useCallback, useMemo } from 'preact/hooks'
import { select } from 'd3-selection'
import { geoPath } from 'd3-geo'
import { MapContext } from '../context/MapContext'
import { CompositionBorders } from '../layers/CompositionBorders'
import { useZoom } from '../hooks/useZoom'
import { useSignalEffect } from '@preact/signals'

export function CanvasRenderer({ children }) {
  const canvasRef = useRef()
  const context = useContext(MapContext)
  const { zoomBehaviour, transform, fitBounds } = useZoom({
    ...context.zoom,
  })

  const [drawingFunctions, setDrawingFunctions] = useState([])
  const [pendingUpdate, setPendingUpdate] = useState(false)
  const [path, setPath] = useState()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')
    setPath(() => geoPath(context.projection, ctx))
  }, [context.projection])

  useEffect(() => {
    if (canvasRef.current) {
      const element = select(canvasRef.current)
      element.call(zoomBehaviour)
      // zoomBehaviour.scaleBy(element, 2)
    }
  }, [canvasRef, zoomBehaviour])

  useSignalEffect(() => {
    const feature = context.selectedFeature?.value
    if (feature) {
      fitBounds(path.bounds(feature), context.sizeInPixels)
    }
  })

  const update = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.save()
    ctx.clearRect(0, 0, context.sizeInPixels.width, context.sizeInPixels.height)
    // console.log('transform.x', transform.x, 'transform.y', transform.y)
    ctx.translate(transform.x, transform.y)
    ctx.scale(transform.k, transform.k)

    // set defaults
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    // JUST FOR DEBUGGING
    // drawHouse(ctx)

    for (const drawMapElement of drawingFunctions) {
      ctx.save()
      drawMapElement(ctx, path)
      ctx.restore()
    }

    drawCircleAtPoint(ctx, { x: context.sizeInPixels.width / 2, y: context.sizeInPixels.height / 2 })

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

  const canvasContext = {
    ...context,
    register,
    unregister,
    invalidate,
  }

  return (
    <canvas
      ref={canvasRef}
      id={context.id}
      width={sizeInPixels.width}
      height={sizeInPixels.height}
      style={{ width, height }}
    >
      <MapContext.Provider value={canvasContext}>
        {children}
        {/* <CompositionBorders /> */}
      </MapContext.Provider>
    </canvas>
  )
}

// function drawHouse(ctx) {
//   // Set line width
//   ctx.lineWidth = 10

//   // Wall
//   ctx.strokeRect(75, 140, 150, 110)

//   // Door
//   ctx.fillRect(130, 190, 40, 60)

//   // Roof
//   ctx.beginPath()
//   ctx.moveTo(50, 140)
//   ctx.lineTo(150, 60)
//   ctx.lineTo(250, 140)
//   ctx.closePath()
//   ctx.stroke()
// }

function drawCircleAtPoint(ctx, point) {
  ctx.save()

  ctx.beginPath()
  ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI, false)
  ctx.fillStyle = '#FF0000'
  ctx.fill()

  ctx.restore()
}
