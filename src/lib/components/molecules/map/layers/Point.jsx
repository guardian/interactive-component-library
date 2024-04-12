import { useContext } from 'preact/hooks'
import { MapContext } from '../context/MapContext'
import { dynamicPropValue } from '../helpers/dynamicPropValue'

export function Point({ id, features, radius = 4, fill = null, stroke = null, strokeWidth = 1, styles, onMouseEnter, onMouseLeave, onMouseOver, onClick}) {
  const context = useContext(MapContext)

  return (
    <>
      {features.map((d, index) => {
        const [cx, cy] = context.projection(d.geometry.coordinates)
        return (
          <circle
            id={dynamicPropValue(id, d, index)}
            cx={cx}
            cy={cy}
            r={dynamicPropValue(radius, d, index)}
            key={index}
            className={dynamicPropValue(styles, d, index)}
            fill={dynamicPropValue(fill, d, index)}
            stroke={dynamicPropValue(stroke, d, index)}
            strokeWidth={dynamicPropValue(strokeWidth, d, index)}
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
