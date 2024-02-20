import { LegendItem } from '.'
import overrides from './overrides.module.css'

export default {
  title: 'Particles/Legend item',
  component: LegendItem,
}

export const Default = {
  args: {
    text: 'Legend item',
    styles: overrides,
  },
}
