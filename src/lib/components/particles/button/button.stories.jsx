import { Button } from '.'

const meta = {
  title: 'Particles/Button',
  component: Button,
  render: (args) => {
    return <Button {...args}>A basic button</Button>
  },
}

export default meta

export const Default = {}

export const Small = {
  args: {
    type: 'small',
  },
}
