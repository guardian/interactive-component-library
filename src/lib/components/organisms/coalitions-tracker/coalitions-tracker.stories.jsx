import { CoalitionsTracker } from "."

const meta = {
  title: "Organisms/Coalitions tracker",
  component: CoalitionsTracker,
}

export default meta

const results = [
  {
    partyName: "Conservatives",
    abbreviation: "con",
    totalSeats: 300,
  },
  {
    partyName: "Labour",
    abbreviation: "lab",
    totalSeats: 320,
  },
  {
    partyName: "Liberal Democrats",
    abbreviation: "libdem",
    totalSeats: 10,
  },
  {
    partyName: "SNP",
    abbreviation: "snp",
    totalSeats: 10,
  },
  {
    partyName: "Green",
    abbreviation: "green",
    totalSeats: 10,
  },
]

const data = [
  { name: "Lab-Lib", parties: ["libdem", "lab"], description: "lorem ipsum dolor sit" },
  { name: "Lab-Lib-Green", parties: ["snp", "lab", "libdem", "green"], description: "Sed ut perspiciatis unde omnis ist" },
  {
    name: "Lab-SNP",
    parties: ["lab", "snp"],
    description: "Ut enim ad minima veniam, quis nostrum exercitationem, Ut enim ad minima veniam, quis nostrum exercitationem Ut enim ad minima veniam, quis nostrum exercitationem",
  },
].map((a) => ({
  name: a.name,
  description: a.description,
  parties: a.parties.map((p) => ({ partyName: p, totalSeats: results.find((r) => r.abbreviation === p).totalSeats })),
}))

export const Default = {
  args: {
    coalitions: data,
    listMembersAccessor: "parties",
    abbreviationAccessor: "partyName",
    threshold: 350,
    thresholdTextBold: "350 seats needed for a working majority",
    thresholdText: "After Sinn Fein seats discounted",
    labelOverlapConfig: {
      labelSize: 18,
      moveBothLabels: false,
    },
  },
  render: (args) => <CoalitionsTracker {...args} />,
}
