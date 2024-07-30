import { Chevron } from "."

export default {
  title: "Particles/Chevron",
  component: Chevron,
  argTypes: {
    direction: {
      options: ["up", "down"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
    },
  },
}

export const Small = {
  args: {
    active: true,
  },
}

export const Large = {
  args: {
    active: true,
    size: "large",
  },
}
