import { PartyProfile } from '.'

export default {
  title: 'Molecules/PartyProfile',
  component: PartyProfile,
}

const defaultArgs = {
  title: 'Labour',
  abbreviation : "lab",
  subtitle: 'Keir Starmer',
  blurb: 'Labour is the traditional party of the centre-left in Great Britain.',
  imgSrc: 'https://gdn-cdn.s3.amazonaws.com/2024/03/pix/stamer500GaryCaltonObs-removebg-preview.png'
}

export const Default = {
  args: defaultArgs,
  render: (args) => <PartyProfile {...args} />,
}

