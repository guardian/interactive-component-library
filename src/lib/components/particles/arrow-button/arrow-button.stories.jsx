import { ArrowButton } from '.'

const meta = {
  title: 'Particles/ArrowButton',
  component: ArrowButton,
}

export default meta

export const Right = {}

export const RightDisabled = {
  args: {
    disabled: true,
  },
}

export const Left = {
  args: {
    direction: 'left',
  },
}

export const LeftDisabled = {
  args: {
    direction: 'left',
    disabled: true,
  },
}
