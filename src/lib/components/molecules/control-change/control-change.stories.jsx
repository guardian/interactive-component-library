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

const withStylesArgs = {
  styles: {
    previous: `stop-color--con`,
    next: `stop-color--lab`
  },
  text: 'Lab gain from Con',
  previous: 'Con',
  next: 'Lab'
}

export const HasChanged = {
  args: hasChangedArgs,
  render: (args) => <ControlChange {...args} />,
}

export const HasNotChanged = {
  args: hasNotChangedArgs,
  render: (args) => <ControlChange {...args} />,
}


export const withStyles = {
  args: withStylesArgs,
  render: (args) => <ControlChange {...args} />,
}

