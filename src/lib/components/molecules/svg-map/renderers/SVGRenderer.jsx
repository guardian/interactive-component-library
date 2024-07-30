import { useContext } from "preact/hooks"
import { MapContext } from "../context/MapContext"
import { CompositionBorders } from "../layers/CompositionBorders"

export function SVGRenderer({ children }) {
  const { id, config, size, selectedFeature, padding } = useContext(MapContext)

  return (
    <svg
      id={id}
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        if (selectedFeature) {
          selectedFeature.value = null
        }
      }}
    >
      <g transform={`translate(${padding.left} ${padding.top})`}>
        <g>{children}</g>
        {config.drawCompositionBorders &&
          Object.prototype.hasOwnProperty.call(
            config.projection,
            "getCompositionBorders",
          ) && <CompositionBorders />}
      </g>
    </svg>
  )
}
