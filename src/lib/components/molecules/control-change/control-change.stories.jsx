import { ControlChange } from '.'

export default {
  title: 'Molecules/ControlChange',
  component: ControlChange,
}

const hasChangedArgs = {
  previous: 'lab',
  next: 'con',
  text: 'Con gain from Lab'
}

const hasNotChangedArgs = {
  previous: 'con',
  next: 'con',
  text: 'Con hold'
}

export const HasChanged = {
  args: hasChangedArgs,
  render: (args) => <ControlChange {...args} />,
}

export const HasNotChanged = {
  args: hasNotChangedArgs,
  render: (args) => <ControlChange {...args} />,
}

