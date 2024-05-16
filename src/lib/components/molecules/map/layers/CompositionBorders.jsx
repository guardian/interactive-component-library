import { useContext } from 'preact/hooks'
import { MapContext } from '../context/MapContext'
import defaultStyles from './compositionBorders.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

export function CompositionBorders({ styles }) {
  const { projection } = useContext(MapContext)
  
  styles = mergeStyles(defaultStyles, styles)

  // const ctx = drawingContext
  // if (drawingContext) {
  //   ctx.beginPath()
  //   ctx.lineWidth = 1
  //   ctx.strokeStyle = '#dcdcdc'
  //   projection.drawCompositionBorders(ctx)
  //   ctx.stroke()
  //   return
  // }

  return <path className={styles.path} d={projection.getCompositionBorders()} />
}
