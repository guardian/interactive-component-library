import { GradientIcon } from '.'
import myStoryStyle from './mystorystyle.module.css'

export default {
  title: 'Particles/GradientIcon',
  component: GradientIcon,
}

export const Default = {
  args: {
    previous: 'lab',
    next: 'con',
  },
  render: (args) => <GradientIcon {...args} />,
}

export const UsingCustomStyles = {
  args: {
    styles: myStoryStyle
  },
  render: (args) => <GradientIcon {...args} />,
}

export const UsingCustomPartyClasses = {
  args: {
    styles: {
      previous: 'stop-color--lab',
      next: 'stop-color--con',
    }
  },
  render: (args) => <GradientIcon {...args} />,
}