import { ZoomControl } from "./ZoomControl"
import { action } from "@storybook/addon-actions"

const meta = {
  title: "Molecules/CanvasMap/Controls",
  component: ZoomControl,
  args: {
    onZoomIn: action("zoom in"),
    onZoomOut: action("zoom out"),
  },
}

export default meta

export const Zoom = {}

export const ResetEnabled = {
  args: {
    resetEnabled: true,
  },
}
