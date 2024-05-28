import { action } from "@storybook/addon-actions"
import { Dropdown } from "."
import iconProportional from "./sample-images/grid.svg"
import iconECR from "./sample-images/grid-ecr.svg"
import iconID from "./sample-images/grid-id.svg"
import iconEPP from "./sample-images/grid-epp.svg"
import iconGreens from "./sample-images/grid-greens.svg"
import iconLeft from "./sample-images/grid-left.svg"
import iconRenew from "./sample-images/grid-renew.svg"
import iconSD from "./sample-images/grid-sd.svg"

const meta = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  args: {
    onSelect: action("select"),
  },
}

export default meta

export const Default = {
  args: {
    icon: iconProportional,
    title: "Change view",
    collapseOnSelect: false,
    expandByDefault: true,
    options: [
      {
        title: "Proportional",
        description: "One square is one seat in parliament",
        icon: iconProportional,
      },
      {
        title: "Left",
        description: "Percentage of seats per country",
        icon: iconLeft,
      },
      {
        title: "SD",
        description: "Percentage of seats per country",
        icon: iconSD,
      },
      {
        title: "Greens/EFA",
        description: "Percentage of seats per country",
        icon: iconGreens,
      },
      {
        title: "Renew",
        description: "Percentage of seats per country",
        icon: iconRenew,
      },
      {
        title: "EPP",
        description: "Percentage of seats per country",
        icon: iconEPP,
      },
      {
        title: "ECR",
        description: "Percentage of seats per country",
        icon: iconECR,
      },
      {
        title: "ID",
        description: "Percentage of seats per country",
        icon: iconID,
      },
    ],
  },
}

export const OnlyTitles = {
  args: {
    icon: iconProportional,
    title: "Change view",
    options: [
      {
        title: "Proportional",
        icon: iconProportional,
      },
      {
        title: "Left",
        icon: iconLeft,
      },
      {
        title: "SD",
        icon: iconSD,
      },
      {
        title: "Greens/EFA",
        icon: iconGreens,
      },
      {
        title: "Renew",
        icon: iconRenew,
      },
      {
        title: "EPP",
        icon: iconEPP,
      },
      {
        title: "ECR",
        icon: iconECR,
      },
      {
        title: "ID",
        icon: iconID,
      },
    ],
  },
}

export const groups = {
  args: {
    icon: iconProportional,
    title: "Change view",
    collapseOnSelect: true,
    options: [
      {
        title: "Seats in parliament",
        options: [
          {
            title: "Proportional",
            icon: iconProportional,
          },
        ],
      },
      {
        title: "Percentage of seats in country",
        options: [
          {
            title: "Left",
            icon: iconLeft,
          },
          {
            title: "SD",
            icon: iconSD,
          },
          {
            title: "Greens/EFA",
            icon: iconGreens,
          },
          {
            title: "Renew",
            icon: iconRenew,
          },
          {
            title: "EPP",
            icon: iconEPP,
          },
          {
            title: "ECR",
            icon: iconECR,
          },
          {
            title: "ID",
            icon: iconID,
          },
        ],
      },
    ],
  },
}
