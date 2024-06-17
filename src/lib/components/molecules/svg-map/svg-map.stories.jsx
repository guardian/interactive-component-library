import { SVGMap, MapConfiguration, MapLayers, _Projection } from "."
import ukCountriesTopo from "./sample-data/UK-countries-topo.json"
import westminsterConstituenciesTopo from "./sample-data/UK-constituencies-simplified-topo.json"
import englandLocalAuthoritiesTopo from "./sample-data/England-local-authories-2023-topo.json"
import englandCentroids from "./sample-data/England-centroids-LE-2023.json"
import ukAlbersMap from "./sample-data/uk-outline-composite.svg"
import { feature, mesh } from "topojson-client"
import { useEffect, useRef, useState } from "preact/hooks"
import { Tooltip } from "$molecules"
import styles from "./stories.module.css"

const ukCountries = feature(ukCountriesTopo, ukCountriesTopo.objects["countries"])

const constituencies = feature(westminsterConstituenciesTopo, westminsterConstituenciesTopo.objects["UK-constituencies"])

const borders = mesh(westminsterConstituenciesTopo, westminsterConstituenciesTopo.objects["UK-constituencies"], (a, b) => {
  return a.properties.id !== b.properties.id
})

const localAuthorities = feature(englandLocalAuthoritiesTopo, englandLocalAuthoritiesTopo.objects["local-authorities"])

const meta = {
  title: "Molecules/SVGMap/Maps",
  component: SVGMap,
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
  },
  argTypes: {
    id: {
      control: "text",
      description: "ID applied to the map element",
    },
    width: {
      type: "number",
      table: { defaultValue: { detail: "Map scales to size of parent element", summary: "auto" } },
    },
    height: {
      type: "number",
      table: { defaultValue: { detail: "Map scales to size of parent element", summary: "auto" } },
    },
    config: {
      name: "config (required)",
      control: "select",
      description: "MapConfiguration object",
      options: ["UK Composite", "England"],
      mapping: { "UK Composite": MapConfiguration.UKComposite, England: MapConfiguration.England },
    },
    projection: {
      table: { category: "config" },
      name: "config.projection",
      description: "D3 projection function, e.g. d3.geoAlbers() (required)",
      control: "select",
      options: ["GeoAlbers UK composite", "GeoAlbers England"],
      mapping: { "GeoAlbers UK composite": _Projection.UKComposite, "GeoAlbers England": _Projection.geoAlbersEngland },
    },
    bounds: {
      table: { category: "config" },
      defaultValue: "Default value",
      name: "config.bounds",
      control: "object",
      description: "Visible bounds. The map is scaled and translated to fit these bounds (required)",
    },
    padding: {
      type: "object",
      table: {
        defaultValue: {
          detail: "{ top: 20, right: 20, bottom: 20, left: 20 }",
          summary: "20px",
        },
      },
    },
  },
  decorators: [
    (Story, { viewMode }) => (
      <>
        <div className={styles[`context-${viewMode}`]}>
          <Story />
        </div>
      </>
    ),
  ],
}

export default meta

export const UKMap = {
  name: "UK outline",
  args: {
    id: "map",
    config: MapConfiguration.UKComposite,
  },
  render: (args) => (
    <SVGMap {...args}>
      <MapLayers.Polygon features={[ukCountries]} fill="#707070" />
    </SVGMap>
  ),
}

export const UKConstituencies = {
  name: "UK constituencies",
  args: {
    id: "map",
    config: MapConfiguration.UKComposite,
  },
  render: (args) => (
    <SVGMap {...args}>
      <MapLayers.Polygon features={constituencies.features} fill="#dcdcdc" />
      <MapLayers.Line features={[borders]} />
    </SVGMap>
  ),
}

const parties = ["con", "lab", "libdem", ""]

export const UKChoropleth = {
  name: "UK choropleth",
  args: {
    id: "map",
    config: MapConfiguration.UKComposite,
  },
  render: (args) => (
    <SVGMap {...args}>
      <MapLayers.Polygon features={constituencies.features} styles={(_, index) => `fill-color--${parties[index % 4]}`} />
      <MapLayers.Line features={[borders]} />
    </SVGMap>
  ),
}

export const BubbleMap = {
  name: "England bubble map",
  args: {
    id: "map",
    config: MapConfiguration.England,
  },
  render: (args) => (
    <SVGMap {...args}>
      <MapLayers.Polygon
        features={localAuthorities.features}
        fill={(_, index) => {
          if (index % 3) return "none"
          return "#dcdcdc"
        }}
        stroke="#dcdcdc"
      />
      <MapLayers.Point
        features={englandCentroids.features}
        radius={(_, index) => {
          if (index % 3) return
          const random = Math.random()
          return Math.sqrt(random * 30)
        }}
        fill="none"
        stroke="#FF0000"
      />
    </SVGMap>
  ),
}

function MapWithTooltip(props) {
  const mapRef = useRef()
  const [mapContainer, setMapContainer] = useState()

  useEffect(() => {
    setMapContainer(mapRef.current.getContainer())
  }, [])

  return (
    <>
      <SVGMap {...props} ref={mapRef}>
        <MapLayers.Polygon
          features={localAuthorities.features}
          fill={(_, index) => {
            if (index % 3) return "none"
            return "#dcdcdc"
          }}
          stroke="#dcdcdc"
        />
      </SVGMap>
      {mapContainer && (
        <Tooltip for={mapContainer} renderIn="#storybook-root">
          {({ x, y }) => {
            const feature = mapRef.current.findFeatureAtPoint({ x, y })
            if (!feature) return
            return (
              <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
                <p>{feature.properties["LAD23NM"]}</p>
              </div>
            )
          }}
        </Tooltip>
      )}
    </>
  )
}

export const EnglandTooltipMap = {
  name: "England map with tooltip",
  args: {
    id: "map",
    config: MapConfiguration.England,
  },
  render: (args) => <MapWithTooltip {...args} />,
}

function BubbleMapWithTooltip(props) {
  const mapRef = useRef()
  const [mapContainer, setMapContainer] = useState()
  const [mapContext, setMapContext] = useState()

  useEffect(() => {
    setMapContainer(mapRef.current.getContainer())
    setMapContext(mapRef.current.getContext())
  }, [])

  return (
    <>
      <SVGMap {...props} ref={mapRef}>
        <MapLayers.Polygon
          features={localAuthorities.features}
          fill={(_, index) => {
            if (index % 3) return "none"
            return "#dcdcdc"
          }}
          stroke="#dcdcdc"
        />
        <MapLayers.Point features={englandCentroids.features.slice(0, 20)} radius={10} fill="none" stroke="#FF0000" />
      </SVGMap>
      {mapContainer && (
        <Tooltip for={mapContainer} renderIn="#storybook-root">
          {({ x, y }) => {
            const feature = mapContext.findFeatureAtPoint({ x, y })
            if (!feature) return
            return (
              <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
                <p>{feature.properties["LAD23CD"]}</p>
              </div>
            )
          }}
        </Tooltip>
      )}
    </>
  )
}

export const EnglandBubbleTooltipMap = {
  name: "England bubble map with tooltip",
  args: {
    id: "map",
    config: MapConfiguration.England,
  },
  render: (args) => <BubbleMapWithTooltip {...args} />,
}

export const UKPrerendered = {
  name: "UK prerendered",
  args: {
    id: "map",
    width: 344,
    height: 500,
    config: {
      ...MapConfiguration.UKComposite,
      drawCompositionBorders: false,
    },
  },
  render: (args) => (
    <SVGMap {...args}>
      <MapLayers.Prerendered url={ukAlbersMap} />
    </SVGMap>
  ),
}

const pointFeature = {
  type: "Feature",
  properties: {},
  geometry: {
    coordinates: [-1.8493131533106464, 52.47839065894283],
    type: "Point",
  },
}

export const UKLocator = {
  name: "UK locator",
  args: {
    id: "map",
    width: 948,
    height: 544,
    config: { ...MapConfiguration.UKComposite, drawCompositionBorders: false },
    padding: null,
  },
  render: (args) => (
    <SVGMap {...args}>
      <MapLayers.Prerendered url={ukAlbersMap} />
      <MapLayers.Point features={[pointFeature]} radius={6} stroke="#FFF" />
    </SVGMap>
  ),
}
