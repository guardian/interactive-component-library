import { ItemSummary } from '.'

export default {
  title: 'Particles/Item Summary',
  component: ItemSummary,
}

export const Default = {
  args: {
    itemDeets: {
      name: 'The Name',
      description: 'The description'
    },
  },
}
