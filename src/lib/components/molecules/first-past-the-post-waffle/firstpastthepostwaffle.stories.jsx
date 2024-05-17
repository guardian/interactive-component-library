import { FirstPastThePostWaffle } from '.'
import { Waffle, WaffleType } from '$particles'

export default {
  title: 'Molecules/FPTPWaffle',
  component: FirstPastThePostWaffle,
}

const summary = {
  lab: 350,
  con: 200,
  snp: 50,
  ld: 30,
  green: 1,
  undeclared: 19
}

// the output of the following line is: [{party: 'lab', class: fill-color-lab}, ...]
const partySeats = Object.keys(summary)
  .map(party => Array(summary[party]).fill({ party, class: `fill-color--${party}` }))
  .flat()

const waffleArgs = {
  units: partySeats,
  numberOfRows: 5,
  idAccessor: 'party',
  onMouseOver: (a, b) => console.log(a, b),
  type: WaffleType.circle
}

const args = {
  lineOverHang: 15
}

export const Default = {
  args,
  render: (args) => (
    <FirstPastThePostWaffle {...args}>
      {{
        waffle: <Waffle {...waffleArgs} />,
        halfLineText: '326 to win',
      }}
    </FirstPastThePostWaffle>
  )
}