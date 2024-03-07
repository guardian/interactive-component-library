import { useContext } from 'preact/hooks'
import { MapContext } from './MapContext'
import { useZoom } from '../hooks/useZoom'

export function ZoomProvider({ config, zoomTo, children }) {
  const context = useContext(MapContext)
  const { ref, transform } = useZoom({ context, config, extent: context.extent, zoomTo })

  return (
    <MapContext.Provider value={{ ...context, zoomScale: transform.k }}>
      {context.config.drawToCanvas && children}
      {context.config.drawToCanvas === false && <g ref={ref}>{children}</g>}
    </MapContext.Provider>
  )
}
