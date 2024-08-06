import { SVGMap, MapConfiguration } from "../"
import { Polygon as Layer } from "./Polygon"
import { feature } from "topojson-client"
import { saveSVG } from "../helpers/saveSVG"
import ukCountriesTopo from "../sample-data/UK-countries-topo.json"
import styles from "../stories.module.css"

const ukCountries = feature(
  ukCountriesTopo,
  ukCountriesTopo.objects["countries"],
)

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
        <div style={{ width: "100%", height: "500px" }}>
          <Story />
        </div>
        <button className={styles.button} onClick={() => saveSVG("map")}>
          Download SVG
        </button>
      </>
    ),
  ],
  render: (args) => (
    <SVGMap id="map" config={MapConfiguration.UKComposite}>
      <Layer {...args} />
    </SVGMap>
  ),
}

export default meta

export const Polygon = {
  args: {
    features: ukCountries.features,
    fill: "#dcdcdc",
    stroke: "#707070",
    strokeWidth: 1,
  },
}
