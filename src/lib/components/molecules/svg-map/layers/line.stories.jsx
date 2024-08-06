import { SVGMap, MapConfiguration } from "../"
import { Line as Layer } from "./Line"
import { Polygon } from "./Polygon"
import { feature, mesh } from "topojson-client"
import westminsterConstituenciesTopo from "../sample-data/UK-constituencies-simplified-topo.json"

const constituencies = feature(
  westminsterConstituenciesTopo,
  westminsterConstituenciesTopo.objects["UK-constituencies"],
)

const borders = mesh(
  westminsterConstituenciesTopo,
  westminsterConstituenciesTopo.objects["UK-constituencies"],
  (a, b) => {
    return a.properties.id !== b.properties.id
  },
)

/** @type {import('@storybook/preact').Meta} */
const meta = {
  title: "Molecules/SVGMap/Layers",
  component: Layer,
  argTypes: {
    stroke: {
      control: "color",
    },
  },
  render: (args) => (
    <SVGMap config={MapConfiguration.UKComposite}>
      <Polygon
        features={constituencies.features}
        fill="none"
        stroke="#dcdcdc"
        strokeWidth={1}
      />
      <Layer {...args} />
    </SVGMap>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "100%", height: "500px" }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Line = {
  args: {
    features: [borders],
    stroke: "#FF0000",
    strokeWidth: 1,
  },
}
