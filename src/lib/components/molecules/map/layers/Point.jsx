import { useContext, useEffect, useState } from 'preact/hooks'
import { MapContext } from '../context/MapContext'
import { dynamicPropValue } from '../helpers/dynamicPropValue'

export function Point({ id, features, radius = 4, fill = null, stroke = null, strokeWidth = 1, styles }) {
  const context = useContext(MapContext)
  const [distances, setDistances] = useState({})
  const [cursor, setCursor] = useState([0, 0])

  useEffect(() => {
    function findFeatureAtPoint(point) {
      setCursor(point)

      for (const [index, feature] of features.entries()) {
        const resolvedRadius = dynamicPropValue(radius, feature, index) + 1
        if (isNaN(resolvedRadius)) return

        const [cx, cy] = context.projection(feature.geometry.coordinates)

        const distanceSquared = (point[0] - cx) ** 2 + (point[1] - cy) ** 2
        const radiusSquared = resolvedRadius ** 2
        setDistances((distances) => {
          distances[feature.properties.id] = `${Math.round(distanceSquared)}, ${Math.round(resolvedRadius ** 2)}`
          return { ...distances }
        })

        if (distanceSquared <= radiusSquared) {
          return feature
        }
      }

      return null
    }

    const layer = {
      findFeatureAtPoint,
    }
    context.registerLayer(layer)

    return () => {
      context.unregisterLayer(layer)
    }
  }, [context, features, radius])

  return (
    <>
      <g id="cursor">
        <circle cx={cursor[0]} cy={cursor[1]} r={3} fill="#333" strokeWidth={2} />
      </g>
      {features.map((d, index) => {
        const [cx, cy] = context.projection(d.geometry.coordinates)
        return (
          <g key={index}>
            <text x={cx} y={cy} dy={2} textAnchor="middle" alignmentBaseline="middle">
              {distances[d.properties['id']]}
            </text>
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
            />
          </g>
        )
      })}
    </>
  )
}
