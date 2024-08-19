import { action } from "@storybook/addon-actions"
import { OptionPicker } from "."
import choropleth from "./sample-images/choropleth.png"
import cartogram from "./sample-images/hex-cartogram.svg"
import styles from "./stories.module.css"

const meta = {
  title: "Molecules/OptionPicker",
  component: OptionPicker,
  args: {
    onSelect: action("select"),
    styles,
  },
}

export default meta

export const Default = {
  args: {
    title: "Change map view",
    options: [
      {
        title: "State & county results",
        icon: choropleth,
      },
      {
        title: "Electoral college votes",
        icon: cartogram,
      },
      {
        title: "Popular vote margin",
        icon: cartogram,
      },
    ],
  },
}
