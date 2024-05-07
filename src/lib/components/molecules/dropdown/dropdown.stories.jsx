import { Dropdown } from "."
import gridIconUrl from "./sample-images/grid.svg"

const meta = {
  title: "Molecules/Dropdown",
  component: Dropdown,
}

export default meta

export const Default = {
  args: {
    icon: gridIconUrl,
    title: 'Change view',
  },
}