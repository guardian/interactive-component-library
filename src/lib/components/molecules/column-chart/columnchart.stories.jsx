import { ColumnChart } from '.'

const meta = {
  title: 'Molecules/ColumnChart',
  component: ColumnChart,
}

export default meta

export const Default = {
  args: {
    minValue: -100,
    maxValue: 300,
    chartHeight: 400,
    chartWidth: 400,
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

export const Councillors = {
  args: {
    minValue: -100,
    maxValue: 300,
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