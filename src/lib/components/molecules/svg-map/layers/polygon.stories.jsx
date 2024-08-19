import { geoIdentity } from "d3-geo"
import { SVGMap, MapConfiguration } from "../"
import { Polygon as Layer } from "./Polygon"
import { feature } from "topojson-client"
import { saveSVG } from "../helpers/saveSVG"
import ukCountriesTopo from "../sample-data/UK-countries-topo.json"
import usStatesTopo from "../sample-data/us-states-topo-albers.json"
import styles from "../stories.module.css"

const ukCountries = feature(
  ukCountriesTopo,
  ukCountriesTopo.objects["countries"],
)

const usStates = feature(usStatesTopo, usStatesTopo.objects["states"])

/** @type {import('@storybook/preact').Meta} */
const meta = {
  title: "Molecules/SVGMap/Layers",
  component: Layer,
  argTypes: {
    fill: {
      control: "color",
    },
    stroke: {
      control: "color",
    },
  },
  decorators: [
    (Story) => (
      <>
        <div style={{ width: "100%", height: "215px" }}>
          <Story />
        </div>
        <button className={styles.button} onClick={() => saveSVG("map")}>
          Download SVG
        </button>
      </>
    ),
  ],
  render: (args) => (
    <SVGMap id="map" config={args.config} padding={args.padding}>
      <Layer {...args} />
    </SVGMap>
  ),
}

export default meta

export const Polygon = {
  args: {
    features: ukCountries.features,
    config: MapConfiguration.UKComposite,
    fill: "#dcdcdc",
    stroke: "#707070",
    strokeWidth: 1,
  },
}

export const UsStatePolygon = {
  args: {
    features: usStates.features,
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    config: {
      projection: geoIdentity(),
      bounds: [
        [-57.66491068874468, 12.97635452036684],
        [957.5235629133763, 606.5694262668667],
      ],
      drawCompositionBorders: true,
      drawToCanvas: false,
    },
    fill: "#dcdcdc",
    stroke: "#707070",
    strokeWidth: 1,
  },
}
