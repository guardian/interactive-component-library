import { LegendItem } from '.'
import styles from './style-override.module.css'

export default {
  title: 'Particles/Legend item',
  component: LegendItem,
}

export const Default = {
  args: {
    text: 'Legend item',
  },
}

export const CustomStyle = {
  args: {
    text: 'Legend item',
    styles,
  },
}
