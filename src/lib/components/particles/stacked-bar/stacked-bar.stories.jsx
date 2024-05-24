import { StackedBar, LabelType } from "."

const meta = {
  title: "Particles/StackedBar",
  component: StackedBar,
}

export default meta

export const UsingHexColours = {
  args: {
    stack: [
      {
        label: "40",
        fraction: 0.2,
        fill: "#FF0000",
      },
      {
        label: "40",
        fraction: 0.2,
        fill: "#0084c6",
      },
      {
        label: "40",
        fraction: 0.2,
        fill: "#E05E00",
      },
    ],
    width: 358,
    height: 32,
    showBackgroundRect: false,
  },
  render: (args) => <StackedBar {...args} />,
}

export const UsingAbbreviations = {
  args: {
    stack: [
      {
        label: "120",
        fraction: 0.6,
        abbreviation: "lab",
      },
      {
        label: "40",
        fraction: 0.2,
        abbreviation: "con",
      },
      {
        label: "40",
        fraction: 0.2,
        abbreviation: "undeclared",
      },
    ],
    width: 358,
    height: 32,
    showBackgroundRect: false,
  },
  render: (args) => <StackedBar {...args} />,
}

export const HangingLabels = {
  args: {
    stack: [
      {
        label: "970",
        fraction: 0.97,
        abbreviation: "lab",
      },
      {
        label: "150",
        fraction: 0.015,
        abbreviation: "con",
      },
      {
        label: "150",
        fraction: 0.015,
        abbreviation: "undeclared",
      },
    ],
    width: 358,
    height: 32,
    showBackgroundRect: false,
    labelType: LabelType.hanging,
    labelOverlapConfig: {
      labelSize: 25,
      moveBothLabels: false,
    },
  },
  render: (args) => <StackedBar {...args} />,
}

export const Compact = {
  args: {
    stack: [
      {
        label: "120",
        fraction: 0.6,
        fill: "#FF0000",
      },
      {
        label: "10",
        fraction: 0.05,
        fill: "#0084c6",
      },
      {
        label: "70",
        fraction: 0.35,
        fill: "#E05E00",
      },
    ],
    width: 200,
    height: 20,
    showBackgroundRect: false,
  },
  render: (args) => <StackedBar {...args} />,
}

export const WithBackgroundRect = {
  args: {
    stack: [
      {
        label: "40",
        fraction: 0.2,
        fill: "#FF0000",
      },
      {
        label: "40",
        fraction: 0.2,
        fill: "#0084c6",
      },
      {
        label: "40",
        fraction: 0.2,
        fill: "#E05E00",
      },
    ],
    width: 358,
    height: 32,
    showBackgroundRect: true,
  },
  render: (args) => <StackedBar {...args} />,
}
