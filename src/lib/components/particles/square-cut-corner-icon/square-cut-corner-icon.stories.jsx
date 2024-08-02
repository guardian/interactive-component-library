import { SquareCutCornerIcon } from "."

export default {
  title: "Particles/SquareCutCornerIcon",
  component: SquareCutCornerIcon,
}

export const Default = {
  args: {
    cornerColor: "green",
    squareColor: "gold",
    squareSize: 24,
  },
}

export const UsingCustomClasses = {
  args: {
    squareSize: 24,
    styles: {
      corner: `fill-color--dup`,
      square: `fill-color--sdlp`,
    },
  },
}
