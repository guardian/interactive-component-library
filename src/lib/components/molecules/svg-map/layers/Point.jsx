import { useContext, useEffect } from "preact/hooks"
import { MapContext } from "../context/MapContext"
import { dynamicPropValue } from "../helpers/dynamicPropValue"

export function Point({
  id,
  features,
  radius = 4,
  fill = null,
  stroke = null,
  strokeWidth = 1,
  zIndex = 0,
  styles,
  labeltextproperty,
}) {
  const context = useContext(MapContext)

  useEffect(() => {
    function findFeatureAtPoint(point) {
      for (const [index, feature] of features.entries()) {
        const resolvedRadius = dynamicPropValue(radius, feature, index)
        if (isNaN(resolvedRadius)) return

        const [cx, cy] = context.projection(feature.geometry.coordinates)

        const distanceSquared = (point[0] - cx) ** 2 + (point[1] - cy) ** 2
        const radiusSquared = resolvedRadius ** 2

        if (distanceSquared <= radiusSquared) {
          return feature
        }
      }

      return null
    }

    const layer = {
      zIndex,
      findFeatureAtPoint,
    }
    context.registerLayer(layer)

    return () => {
      context.unregisterLayer(layer)
    }
  }, [context, features, radius, zIndex])

  return (
    <>
      {features.map((d, index) => {
        const [cx, cy] = context.projection(d.geometry.coordinates)
        const labeltext = d.properties[labeltextproperty]
        return (
          <>
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
            <text x={cx} y={cy} key={index}>
              {labeltext}
            </text>
          </>
        )
      })}
    </>
  )
}
