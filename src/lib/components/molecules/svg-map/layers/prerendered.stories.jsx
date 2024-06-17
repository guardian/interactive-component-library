import { Map, MapConfiguration } from "../"
import { Prerendered as Layer } from "./Prerendered"
import ukAlbersMap from "../sample-data/uk-outline-composite.svg"

const meta = {
  title: "Molecules/Map/Layers",
  component: Layer,
  argTypes: {
    url: {
      control: { type: "file", accept: ".svg" },
      description: "URL to a prerendered SVG map (the SVG image needs to have the same aspect ratio as the map, to avoid distortion)",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "344px", height: "500px", margin: "0 auto" }}>
        <Map config={{ ...MapConfiguration.UKComposite, drawCompositionBorders: false }}>
          <Story />
        </Map>
      </div>
    ),
  ],
}

export default meta

export const Prerendered = {
  args: {
    url: ukAlbersMap,
  },
}
