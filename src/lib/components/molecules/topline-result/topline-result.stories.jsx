import { ToplineResult } from '.'
import { InfoIcon } from '$particles/info-icon'

export default {
  title: 'Molecules/ToplineResult',
  component: ToplineResult,
}

export const Default = {
  args: {
    name: 'Labour',
    abbreviation: 'lab',
    mainNumber: 300,
    secondaryNumber: 120,
  },
  render: (args) => (
    <ToplineResult {...args}>
      <InfoIcon onMouseOver={() => console.log('hello')} />
    </ToplineResult>
  )
}

export const Row = {
  args: {
    name: 'Labour',
    abbreviation: 'lab',
    mainNumber: 300,
    secondaryNumber: 120,
    displayRow: true,
  },
  render: (args) => (
    <ToplineResult {...args}>
      <InfoIcon onMouseOver={() => console.log('hello')} />
    </ToplineResult>
  ),
}
