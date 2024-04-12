import { useContext } from 'preact/hooks'
import { MapContext } from '../context/MapContext'
import { dynamicPropValue } from '../helpers/dynamicPropValue'

export function Polygon({ id, features, fill = null, stroke = null, strokeWidth = 1, styles, onMouseEnter, onMouseLeave, onMouseOver, onClick }) {
  const context = useContext(MapContext)
  // const { drawToCanvas } = context.config

  // const draw = (ctx, path) => {
  //   for (const feature of features) {
  //     ctx.beginPath()
  //     ctx.lineWidth = strokeWidth
  //     ctx.strokeStyle = stroke
  //     ctx.fillStyle = fill
  //     path(feature)
  //     ctx.fill()
  //   }
  // }

  // useEffect(() => {
  //   if (context.config.drawToCanvas) {
  //     context.register(draw)
  //   }
  //   return () => {
  //     if (context.config.drawToCanvas) {
  //       context.unregister(draw)
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (drawToCanvas) {
  //     context.invalidate()
  //   }
  // }, [drawToCanvas, features, fill, stroke, strokeWidth])

  // if (context.config.drawToCanvas) {
  //   return '<!--Polygon layer-->'
  // }

  return (
    <>
      {features.map((d, index) => {
        return (
          <path
            key={index}
            id={dynamicPropValue(id, d, index)}
            className={dynamicPropValue(styles, d, index)}
            fill={dynamicPropValue(fill, d, index)}
            stroke={dynamicPropValue(stroke, d, index)}
            stroke-width={dynamicPropValue(strokeWidth, d, index)}
            d={context.path(d)}
            onMouseEnter={dynamicPropValue(onMouseEnter, d, index)}
            onMouseLeave={dynamicPropValue(onMouseLeave, d, index)}
            onMouseOver={dynamicPropValue(onMouseOver, d, index)}
            onClick={dynamicPropValue(onClick, d, index)}
          />
        )
      })}
    </>
  )
}
