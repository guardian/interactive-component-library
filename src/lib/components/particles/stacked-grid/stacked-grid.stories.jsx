import { StackedGrid } from "."
import { CircleIcon, SquareCutCornerIcon, SquareIcon } from "$particles"

const meta = {
  title: "Particles/StackedGrid",
  component: StackedGrid,
}
export default meta

export const Default = {
  args: {
    fromLeft: true,
    fromBottom: true,
    containerWidth: 100,

    children: (
      <>
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
        <SquareCutCornerIcon
          squareSize="24"
          cornerColor="red"
          squareColor="teal"
        />
      </>
    ),
  },
}

export const WithCircles = {
  args: {
    fromLeft: true,
    fromBottom: true,
    containerWidth: 100,
    children: (
      <>
        <CircleIcon styles={{ circle: "fill-color--lab" }} />
        <CircleIcon styles={{ circle: "fill-color--lab" }} />
        <CircleIcon styles={{ circle: "fill-color--lab" }} />
        <CircleIcon styles={{ circle: "fill-color--sdlp" }} />
        <CircleIcon styles={{ circle: "fill-color--sdlp" }} />
        <CircleIcon styles={{ circle: "fill-color--sdlp" }} />
        <CircleIcon styles={{ circle: "fill-color--sdlp" }} />
        <CircleIcon styles={{ circle: "fill-color--sdlp" }} />
      </>
    ),
  },
}

export const WithSquares = {
  args: {
    fromLeft: true,
    fromBottom: true,
    containerWidth: 175,
    itemWidth: 24,

    children: (
      <>
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--con" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--lab" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--lab" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--lab" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--snp" }} />
        <SquareIcon size="24" styles={{ squareFill: "fill-color--snp" }} />
      </>
    ),
  },
}
