import { DisplayNumbers } from '.'

export default {
  title: 'Particles/DisplayNumbers',
  component: DisplayNumbers,
}

export const Default = {
  args: {
    total: 300,
    change: 120
  },
  render: (args) => <DisplayNumbers {...args} />,
}
