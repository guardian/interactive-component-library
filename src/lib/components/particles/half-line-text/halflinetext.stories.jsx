import { HalfLineText } from '.'

const meta = {
  title: 'Particles/HalfLine',
  component: HalfLineText
}
export default meta



const args = {
  text: '326 for a majority',
  height: 16
}

export const Default = {
  args,
  render: (args) => <HalfLineText {...args} />,
}
