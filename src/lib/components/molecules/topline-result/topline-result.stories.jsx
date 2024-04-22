import { action } from '@storybook/addon-actions'
import { ToplineResult } from '.'
import styles from './topline-result.stories.module.scss'

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

export const WithInfoButton = {
  args: {
    name: 'Labour',
    abbreviation: 'lab',
    mainNumber: 300,
    secondaryNumber: 120,
    showInfoButton: true
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
    styles: {
      toplineResult: styles.rightAlignToplineResult,
      name: styles.rightAlignName
    },
  },
  render: (args) => <ToplineResult {...args} />,
}

export const Candidate = {
  args: {
    name: 'Mike Bloke',
    secondaryName: 'Labour',
    abbreviation: 'lab',
    mainNumber: "50.4",
    mainNumberSuffix: "%",
  },
  render: (args) => <ToplineResult {...args} />,
}