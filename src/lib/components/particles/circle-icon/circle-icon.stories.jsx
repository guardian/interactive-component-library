import { CircleIcon } from "."

export default {
  title: "Particles/CircleIcon",
  component: CircleIcon,
}

export const Default = {
  args: {
    color: "var(--news-core-03)",
    diameter: 20,
  },
}

export const Pulse = {
  args: {
    color: "var(--news-core-03)",
    pulse: true,
  },
}

export const Split = {
  args: {
    diameter: 20,
    color: "var(--news-core-03)",
    splitColor: "var(--news-core-02)",
  },
}
