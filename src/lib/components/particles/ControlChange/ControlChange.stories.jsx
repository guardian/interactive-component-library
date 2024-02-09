import React from 'react'
import { ControlChange } from '.'
export default {
  title: 'Atoms/ControlChange',
  component: ControlChange,
}

const args = {
  previous: { abbr: 'lab', name: 'Labour' },
  current: { abbr: 'con', name: 'Conservatives' },
}

export const Default = {
  args,
  render: (args) => <ControlChange {...args} />,
}
