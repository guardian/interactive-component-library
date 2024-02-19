import { GradientIcon } from '.'

export default {
  title: 'Particles/GradientIcon',
  component: GradientIcon,
}

export const Default = {
  args: {
    previousStopColor: '#c70000',
    nextStopColor: '#0096FF',
  },
  render: (args) => <GradientIcon {...args} />,
}
