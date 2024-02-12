import { StackedBar } from '.'

const meta = {
  title: 'Atoms/StackedBar',
  component: StackedBar,
}

export default meta

export const Default = {
  args: {
    stack: [
      {
        label: '120',
        fraction: 0.6,
        fill: '#FF0000',
      },
      {
        label: '40',
        fraction: 0.2,
        fill: '#0084c6',
      },
      {
        label: '40',
        fraction: 0.2,
        fill: '#CCC',
      },
    ],
    width: 358,
    height: 32,
  },
  render: (args) => <StackedBar {...args} />,
}

export const Compact = {
  args: {
    stack: [
      {
        label: '120',
        fraction: 0.6,
        fill: '#FF0000',
      },
      {
        label: '10',
        fraction: 0.05,
        fill: '#0084c6',
      },
      {
        label: '70',
        fraction: 0.35,
        fill: '#CCC',
      },
    ],
    width: 200,
    height: 20,
  },
  render: (args) => <StackedBar {...args} />,
}
