import { Chevron } from '.'

export default {
  title: 'Atoms/Chevron',
  component: Chevron,
  argTypes: {
    direction: {
      options: ['up', 'down'],
      control: { type: 'radio' },
    },
  },
}

export const Default = {
  args: {
    active: true,
  },
}
