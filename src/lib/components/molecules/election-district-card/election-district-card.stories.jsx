import { ElectionDistrictCard } from '.'

export default {
  title: 'Molecules/ElectionDistrictCard',
  component: ElectionDistrictCard,
}

const args = {
  title: "South Dogsbury",
}

export const Default = {
  args,
  render: (args) => <ElectionDistrictCard {...args} />,
}
