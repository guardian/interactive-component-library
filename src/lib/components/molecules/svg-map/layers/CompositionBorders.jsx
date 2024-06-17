import { useContext, useEffect } from "preact/hooks"
import { MapContext } from "../context/MapContext"
import defaultStyles from "./compositionBorders.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export function CompositionBorders({ styles }) {
  const context = useContext(MapContext)
  const { projection, config } = context

  if (config.drawToCanvas) {
    return <CompositionBordersCanvas context={context} projection={projection} />
  }

  styles = mergeStyles(defaultStyles, styles)

  return <path className={styles.path} d={projection.getCompositionBorders()} />
}

function CompositionBordersCanvas({ context, projection }) {
  const draw = (ctx) => {
    ctx.beginPath()
    ctx.lineWidth = 1
    ctx.strokeStyle = "#dcdcdc"
    projection.drawCompositionBorders(ctx)
    ctx.stroke()
  }

  useEffect(() => {
    context.register(draw)

    return () => {
      context.unregister(draw)
    }
  }, [])

  useEffect(() => {
    context.invalidate()
  }, [projection])

  return "<!--Composition borders-->"
}
