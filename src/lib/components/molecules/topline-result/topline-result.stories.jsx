import { action } from '@storybook/addon-actions'
import { ToplineResult } from '.'

export default {
  title: 'Molecules/ToplineResult',
  component: ToplineResult,
  args: {
    onMouseOver: action('mouse over'),
    onInfoPress: action('info press'),
  },
}

export const Default = {
  args: {
    name: 'Labour',
    abbreviation: 'lab',
    mainNumber: 300,
    secondaryNumber: 120,
  },
  render: (args) => <ToplineResult {...args} />,
}

export const Row = {
  args: {
    name: 'Labour',
    abbreviation: 'lab',
    mainNumber: 300,
    secondaryNumber: 120,
    displayRow: true,
  },
  render: (args) => <ToplineResult {...args} />,
}
