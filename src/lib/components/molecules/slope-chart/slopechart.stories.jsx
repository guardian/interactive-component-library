import { SlopeChart } from "."
import { ResponsiveGrid } from "../responsive-grid"

const meta = {
  title: "Molecules/SlopeChart",
  component: SlopeChart,
}

export default meta

export const Default = {
  args: {
    id: "slope-chart",
    domain: [0, 100],
    lines: [
      {
        y1: 30,
        y2: 10,
        abbreviation: "snp",
      },
      {
        y1: 20,
        y2: 70,
        abbreviation: "libdem",
      },
    ],
    y2Label: (d) => `${d.y2}%`,
    axis: {
      startLabel: "2019",
      endLabel: "2024",
    },
    padding: { left: 24, right: 36, top: 20, bottom: 20 },
  },
  render: (args) => <SlopeChart {...args} />,
}

export const InGrid = {
  args: {
    id: "slope-chart",
    domain: [0, 100],
    lines: [
      {
        y1: 30,
        y2: 10,
        abbreviation: "snp",
      },
      {
        y1: 20,
        y2: 70,
        abbreviation: "libdem",
      },
    ],
    y2Label: (d) => `${d.y2}%`,
    axis: {
      startLabel: "2019",
      endLabel: "2024",
    },
    padding: { left: 24, right: 36, top: 20, bottom: 20 },
  },
  render: (args) => (
    <ResponsiveGrid type="large">
      {new Array(5).fill(null).map((_) => (
        <SlopeChart {...args} />
      ))}
    </ResponsiveGrid>
  ),
}
