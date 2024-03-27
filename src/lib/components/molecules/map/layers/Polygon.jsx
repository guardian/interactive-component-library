import { useContext } from 'preact/hooks'
import { MapContext } from '../context/MapContext'
import { dynamicPropValue } from '../helpers/dynamicPropValue'

export function Polygon({ features, fill = '#DCDCDC', stroke = 'none', strokeWidth = 1, styles }) {
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
            className={dynamicPropValue(styles, d, index)}
            fill={dynamicPropValue(fill, d, index)}
            stroke={dynamicPropValue(stroke, d, index)}
            stroke-width={dynamicPropValue(strokeWidth, d, index)}
            d={context.path(d)}
          />
        )
      })}
    </>
  )
}
