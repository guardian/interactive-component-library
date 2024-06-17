import { Map, MapConfiguration } from "../"
import { Polygon as Layer } from "./Polygon"
import { feature } from "topojson-client"
import { saveSVG } from "../helpers/saveSVG"
import ukCountriesTopo from "../sample-data/UK-countries-topo.json"
import styles from "../stories.module.css"

const ukCountries = feature(ukCountriesTopo, ukCountriesTopo.objects["countries"])

const meta = {
  title: "Molecules/Map/Layers",
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
          <Map id="map" config={MapConfiguration.UKComposite}>
            <Story />
          </Map>
        </div>
        <button className={styles.button} onClick={() => saveSVG("map")}>
          Download SVG
        </button>
      </>
    ),
  ],
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
