import { geoAlbers, geoContains } from 'd3-geo'
import { geoAlbersUk } from 'd3-composite-projections'
import { SVGMapProvider } from './context/SVGMapProvider'
import { SVGRenderer } from './renderers/SVGRenderer'
// import { CanvasMapProvider } from './context/CanvasMapProvider'
// import { CanvasRenderer } from './renderers/CanvasRenderer'
import { toChildArray } from 'preact'
import { useRef, useMemo, useLayoutEffect, useState, useImperativeHandle } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { useContainerSize } from '$shared/hooks/useContainerSize'
import styles from './style.module.css'
export * as MapLayers from './layers'

export const Projection = {
  geoAlbersUKComposite: geoAlbersUk(),
  geoAlbersEngland: geoAlbers().center([0, 52.7]).rotate([1.1743, 0]).parallels([50, 54]),
}

export const MapConfiguration = {
  UKComposite: {
    projection: Projection.geoAlbersUKComposite,
    bounds: [
      [-8.642194417322951, 49.88234469492934],
      [1.7683086664999994, 60.8456995072],
    ],
    drawCompositionBorders: true,
    drawToCanvas: false,
  },
  England: {
    projection: Projection.geoAlbersEngland,
    bounds: [
      [-6.41866730264044, 49.8647926027119],
      [1.76370537625026, 55.8111151140706],
    ],
    drawCompositionBorders: false,
    drawToCanvas: false,
  },
}

const ZERO_PADDING = { top: 0, right: 0, bottom: 0, left: 0 }
const DEFAULT_ZOOM = {
  enabled: false,
  minZoom: 1,
  maxZoom: 8,
}

export const Map = forwardRef(
  (
    {
      id,
      width,
      height,
      config,
      children,
      padding = { top: 20, right: 20, bottom: 20, left: 20 },
      zoom,
      selectedFeature,
    },
    ref,
  ) => {
    padding = padding || ZERO_PADDING
    zoom = Object.assign(DEFAULT_ZOOM, zoom)

    const containerRef = useRef()
    const [isReady, setIsReady] = useState(false)
    useLayoutEffect(() => {
      if (!isReady) {
        setIsReady(true)
      }
    }, [isReady])

    useImperativeHandle(
      ref,
      () => ({
        isReady,
        getContainer: () => containerRef.current,
        findFeatureAtPoint,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isReady],
    )

    function findFeatureAtPoint({ x, y }) {
      const adjustedPoint = [x - padding.left, y - padding.top]
      const coordinates = config.projection.invert(adjustedPoint)

      for (const child of toChildArray(children)) {
        if (Object.prototype.hasOwnProperty.call(child.props, 'features')) {
          const features = child.props.features
          for (const feature of features) {
            if (geoContains(feature, coordinates)) {
              return feature
            }
          }
        }
      }
      return null
    }

    const containerSize = useContainerSize(containerRef)
    const containerStyle = useMemo(() => {
      const style = {}
      if (width > 0) style['width'] = width
      if (height > 0) style['height'] = height
      return style
    }, [width, height])

    const mapRef = useRef()

    const renderSVG = containerSize && !config.drawToCanvas
    // const renderCanvas = containerSize && config.drawToCanvas

    return (
      <div ref={containerRef} className={styles.container} style={containerStyle}>
        {renderSVG && (
          <SVGMapProvider
            id={id}
            width={containerSize.width}
            height={containerSize.height}
            padding={padding}
            config={config}
            mapRef={mapRef}
            selectedFeature={selectedFeature}
            zoom={zoom}
          >
            <SVGRenderer>{children}</SVGRenderer>
          </SVGMapProvider>
        )}
        {/* {renderCanvas && (
        <CanvasMapProvider
          id={id}
          width={containerSize.width}
          height={containerSize.height}
          padding={padding}
          config={config}
          mapRef={mapRef}
          selectedFeature={selectedFeature}
          zoom={zoom}
        >
          <CanvasRenderer>{children}</CanvasRenderer>
        </CanvasMapProvider>
      )} */}
      </div>
    )
  },
)