import { Waffle } from '.'

const meta = {
  title: 'Particles/Waffle',
  component: Waffle,
}
export default meta

// this should also be the sort order, from bigger party to smaller with undeclared at the end
const summary = {
  lab: 350,
  con: 200,
  snp: 50,
  ld: 30,
  green: 1,
  undeclared: 19
}


const partySeats = Object.keys(summary).map(party => Array(summary[party]).fill({ party })).flat()
const args = {
  units: partySeats,
  rows: 5,
  total: 650, 
  abbreviationAccessor:'party',
  paddingTop: 16,
  onMouseOver: (a, b) => console.log(a, b),
  showHalfLine: true
}

export const Default = {
  args,
  render: (args) => <Waffle {...args} squares={false} />,
}

export const Squares = {
  args,
  render: (args) => <Waffle {...args} squares={true} />,
}

