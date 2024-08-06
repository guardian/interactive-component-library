import { useContext, useEffect } from "preact/hooks"
import { MapContext } from "../context/MapContext"
import { dynamicPropValue } from "../helpers/dynamicPropValue"

export function Line({ id, features, stroke = null, strokeWidth = 1, styles }) {
  const context = useContext(MapContext)

  const draw = (ctx, path) => {
    for (const feature of features) {
      ctx.beginPath()
      ctx.lineWidth = strokeWidth / context.pixelRatio
      ctx.strokeStyle = stroke
      path(feature)
      ctx.stroke()
    }
  }

  useEffect(() => {
    if (context.config.drawToCanvas) {
      context.register(draw)
    }
    return () => {
      if (context.config.drawToCanvas) {
        context.unregister(draw)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (context.config.drawToCanvas) {
    return "<!--Line layer-->"
  }

  return (
    <>
      {features.map((d, index) => {
        const resolvedStrokeWidth = dynamicPropValue(strokeWidth, d, index)
        return (
          <path
            id={dynamicPropValue(id, d, index)}
            key={index}
            stroke={dynamicPropValue(stroke, d, index)}
            strokeLinejoin="round"
            strokeWidth={resolvedStrokeWidth}
            fill="none"
            className={dynamicPropValue(styles, d, index)}
            d={context.path(d)}
          />
        )
      })}
    </>
  )
}
