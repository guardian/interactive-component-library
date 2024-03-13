import { ColumnChart } from '.'

const meta = {
  title: 'Molecules/ColumnChart',
  component: ColumnChart,
}

export default meta

export const Default = {
  args: {
    domain: [300, -100],
    chartHeight: 400,
    columnWidth: 20,
    columns: [
      {
        value : 100,
        id: "con",
        color: "blue"
      },
      {
        value : -100,
        id: "lab",
        color: "red"
      },
    ]
  },
  render: (args) => <ColumnChart {...args} />,
}
