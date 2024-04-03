import { withActions } from '@storybook/addon-actions/decorator'
import { InfoButton } from '.'

export default {
  title: 'Particles/InfoButton',
  component: InfoButton,
  parameters: {
    actions: {
      handles: ['click', 'clicked'],
    },
  },
  decorators: [withActions],
}

export const Default = {}
