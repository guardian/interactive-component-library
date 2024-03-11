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
        value : 10,
        id: "con",
        color: "blue"
      },
      {
        value : -10,
        id: "lab",
        color: "red"
      },
    ]
  },
  render: (args) => <ColumnChart {...args} />,
}
