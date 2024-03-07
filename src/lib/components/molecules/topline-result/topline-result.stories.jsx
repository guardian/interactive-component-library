import { ToplineResult } from '.'
import { InfoIcon } from '$particles/info-icon'

export default {
  title: 'Molecules/ToplineResult',
  component: ToplineResult,
}

export const Default = {
  args: {
    name: 'Labour',
    total: 300,
    change: 120,
    styles: { name: `before-color--con` },
    icon: <InfoIcon onMouseOver = {() => console.log('hello')} />
  },
  render: (args) => <ToplineResult {...args} />,
}
