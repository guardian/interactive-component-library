import { ZoomControl } from "./ZoomControl"
import { action } from "@storybook/addon-actions"

const meta = {
  title: "Molecules/Map/Controls",
  component: ZoomControl,
  args: {
    onZoomIn: action("zoom in"),
    onZoomOut: action("zoom out"),
  },
}

export default meta

export const Zoom = {}
