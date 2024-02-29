import { SlopeChart } from '.'

const meta = {
  title: 'Molecules/SlopeChart',
  component: SlopeChart,
}

export default meta

export const Default = {
  args: {
    id: 'slope-chart',
    domain: [0, 100],
    lines: [
      {
        y1: 30,
        y2: 10,
        styles: {
          line: 'stroke-color--snp',
          circle: 'fill-color--snp',
        },
      },
      {
        y1: 20,
        y2: 70,
        color: 'LD',
        styles: {
          line: 'stroke-color--libdem',
          circle: 'fill-color--libdem',
        },
      },
    ],
    y2Label: (d) => `${d.y2}%`,
    axis: {
      startLabel: '2019',
      endLabel: '2024',
    },
    padding: { left: 24, right: 36, top: 20, bottom: 20 },
  },
  render: (args) => <SlopeChart {...args} />,
}
