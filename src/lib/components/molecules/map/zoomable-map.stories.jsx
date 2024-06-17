import { Map, MapConfiguration, MapLayers, Projection, Controls } from "."
import { feature } from "topojson-client"
import { useRef, useState, useEffect } from "preact/hooks"
import { pointer } from "d3-selection"
// import ukCountriesTopo from './sample-data/UK-countries-topo.json'
import westminsterConstituenciesTopo from "./sample-data/UK-constituencies-simplified-topo.json"
import styles from "./stories.module.css"

// const ukCountries = feature(ukCountriesTopo, ukCountriesTopo.objects['countries'])

const constituencies = feature(westminsterConstituenciesTopo, westminsterConstituenciesTopo.objects["UK-constituencies"])

const meta = {
  title: "Molecules/Map/Zoomable maps",
  component: Map,
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
      mapping: { "GeoAlbers UK composite": Projection.UKComposite, "GeoAlbers England": Projection.geoAlbersEngland },
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

export const UKMap = {
  name: "UK outline",
  args: {
    id: "map",
    config: {
      ...MapConfiguration.UKComposite,
      drawToCanvas: true,
    },
    zoom: {
      enabled: true,
    },
  },
  render: (args) => <MapPreview {...args} />,
}

function MapPreview(props) {
  const mapRef = useRef()
  const [mapContext, setMapContext] = useState()
  const [selectedFeature, setSelectedFeature] = useState()

  useEffect(() => {
    setMapContext(mapRef.current.getContext())
  }, [])

  function onMouseMove(event) {
    const point = pointer(event)
    const feature = mapContext.findFeatureAtPoint(point)
    setSelectedFeature(feature)
  }

  function onMouseLeave() {
    setSelectedFeature(null)
  }

  console.log("selected feature", selectedFeature?.properties.id)

  return (
    <div onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ width: "100%" }}>
      <Map {...props} ref={mapRef}>
        <MapLayers.Polygon features={constituencies.features} stroke="#707070" strokeWidth={1} />
        <Controls.Zoom />
      </Map>
    </div>
  )
}

export default meta
