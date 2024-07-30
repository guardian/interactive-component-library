import { SquareIcon } from "."

export default {
  title: "Particles/SquareIcon",
  component: SquareIcon,
}

export const Default = {
  args: {
    size: 24,
    color: "gold",
  },
}

export const UsingCustomClasses = {
  args: {
    size: 24,
    styles: {
      squareFill: `fill-color--sdlp`,
    },
  },
}
