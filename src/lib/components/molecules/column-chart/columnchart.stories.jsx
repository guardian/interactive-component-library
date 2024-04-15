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
    columnWidth: 50,
    columnPadding: {
      left: 0,
      right: 6
    },
    columns: [
      {
        value : 100,
        id: "con",
        color: "blue",
        label: "Con"
      },
      {
        value : -100,
        id: "lab",
        color: "red",
        label : "Lab"
      },
    ]
  },
  render: (args) => <ColumnChart {...args} />,
}

export const allPositive = {
  args: {
    minValue: 0,
    maxValue: 300,
    chartHeight: 400,
    chartWidth: 400,
    columnWidth: 50,
    columnPadding: {
      left: 0,
      right: 6
    },
    columns: [
      {
        value : 100,
        id: "con",
        color: "blue",
        label: "Con"
      },
      {
        value : 200,
        id: "lab",
        color: "red",
        label : "Lab"
      },
    ]
  },
  render: (args) => <ColumnChart {...args} />,
}
