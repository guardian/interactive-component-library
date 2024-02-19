import { ControlChange } from '.'
export default {
  title: 'Molecules/control-change',
  component: ControlChange,
}

const args = {
  previous: { abbreviation: 'lab', color: '#c70000' },
  next: { abbreviation: 'con', color: '#0096FF' },
  text: 'Con gain from Lab',
}

export const Default = {
  args,
  render: (args) => <ControlChange {...args} />,
}
