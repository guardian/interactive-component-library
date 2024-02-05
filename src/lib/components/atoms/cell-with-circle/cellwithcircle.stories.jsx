import { CellWithCircle } from '.'
import { PartyBackgroundColors } from '../../headless/colors'

export default {
  title: 'Atoms/Party cell',
  component: CellWithCircle,
}

export const Default = {
  args: {
    circleClass: PartyBackgroundColors.lab,
    text: 'Labour',
  },
}
