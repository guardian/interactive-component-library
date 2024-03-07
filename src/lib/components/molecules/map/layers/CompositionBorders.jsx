import { useContext } from 'preact/hooks'
import { MapContext } from '../context/MapContext'

export function CompositionBorders() {
  const { projection } = useContext(MapContext)

  // const ctx = drawingContext
  // if (drawingContext) {
  //   ctx.beginPath()
  //   ctx.lineWidth = 1
  //   ctx.strokeStyle = '#dcdcdc'
  //   projection.drawCompositionBorders(ctx)
  //   ctx.stroke()
  //   return
  // }

  return <path stroke="#dcdcdc" fill="none" d={projection.getCompositionBorders()} />
}
