import { FPTPWaffle } from '.'

export default {
  title: 'Molecules/FPTPWaffle',
  component: FPTPWaffle,
}

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
  abbreviationAccessor: 'party',
  paddingTop: 16,
  halfLineTextHeight: 16,
  onMouseOver: (a, b) => console.log(a, b)
}

export const Default = {
  args,
  render: (args) => <FPTPWaffle {...args} />,
}

export const Squares = {
  args,
  render: (args) => <FPTPWaffle {...args} squares={true} />,
}
