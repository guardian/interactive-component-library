import { SVGMap, MapConfiguration } from "../"
import { Prerendered as Layer } from "./Prerendered"
import ukAlbersMap from "../sample-data/uk-outline-composite.svg"

/** @type {import('@storybook/preact').Meta} */
const meta = {
  title: "Molecules/SVGMap/Layers",
  component: Layer,
  argTypes: {
    url: {
      control: { type: "file", accept: ".svg" },
      description:
        "prerendered SVG map (the SVG image needs to have the same aspect ratio as the map, to avoid distortion)",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "344px", height: "500px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <SVGMap
      config={{
        ...MapConfiguration.UKComposite,
        drawCompositionBorders: false,
      }}
    >
      <Layer {...args} />
    </SVGMap>
  ),
}

export default meta

export const Prerendered = {
  args: {
    url: ukAlbersMap,
  },
}
