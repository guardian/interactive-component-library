import { LegendItem } from '.'

export default {
  title: 'Particles/Legend item',
  component: LegendItem,
}

export const Default = {
  args: {
    text: 'Legend item',
    abbreviation: 'con'
  },
}

export const SquareStyle = {
  args: {
    dotType: 'square',
    text: 'Legend item',
    abbreviation: 'lab'
  },
}
