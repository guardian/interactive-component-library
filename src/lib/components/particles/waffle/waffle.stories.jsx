import { Waffle } from '.'
import { CircleIcon, SquareCutCornerIcon } from "$particles"

const meta = {
  title: 'Particles/Waffle',
  component: Waffle,
}
export default meta

export const Default = {
  args: {

    fromLeft: true,
    fromBottom: true,
    containerWidth: 100,
    itemWidth: 24,

    children: (<>
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
                <SquareCutCornerIcon squareSize="24" cornerColor="red" squareColor="teal" />
              </>),

    }

}

export const WithCircles = {
  args: {
    fromLeft: true,
    fromBottom: true,
    containerWidth: 100,
    itemWidth: 12,

    children: (<>
                <CircleIcon abbreviation="lab" />
                <CircleIcon abbreviation="lab" />
                <CircleIcon abbreviation="lab" />
                <CircleIcon abbreviation="sdlp" />
                <CircleIcon abbreviation="sdlp" />
                <CircleIcon abbreviation="sdlp" />
                <CircleIcon abbreviation="sdlp" />
                <CircleIcon abbreviation="sdlp" />
                <CircleIcon abbreviation="sdlp" />
              </>),

  }
}


