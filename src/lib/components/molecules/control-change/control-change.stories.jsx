import { ControlChange } from "."

export default {
  title: "Molecules/ControlChange",
  component: ControlChange,
}

const hasChangedArgs = {
  previous: "lab",
  next: "con",
  text: "Con gain from Lab",
}

const hasChangedAlt = {
  previous: "snp",
  next: "lab",
  text: "Lab gain from SNP",
}

const hasChangedAlt2 = {
  previous: "con",
  next: "lab",
  text: "Lab gain from Con",
}

const hasNotChangedArgs = {
  previous: "con",
  next: "con",
  text: "Con hold",
}

const withStylesArgs = {
  styles: {
    previous: `stop-color--con`,
    next: `stop-color--lab`,
  },
  text: "Lab gain from Con",
  previous: "Con",
  next: "Lab",
}

export const HasChanged = {
  args: hasChangedArgs,
  render: (args) => <ControlChange {...args} />,
}

export const HasNotChanged = {
  args: hasNotChangedArgs,
  render: (args) => <ControlChange {...args} />,
}

export const withStyles = {
  args: withStylesArgs,
  render: (args) => <ControlChange {...args} />,
}

export const ListOfIcons = {
  render: () => (
    <div style={{ height: "100vh" }}>
      <ControlChange {...hasChangedArgs} />
      <ControlChange {...hasChangedAlt} />
      <ControlChange {...hasChangedAlt2} />
    </div>
  ),
}
