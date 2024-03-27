import { WaffledSquare } from '.'

const meta = {
  title: 'Molecules/WaffledSquare',
  component: WaffledSquare
}

export default meta

export const Default = {
  args: {
    name:"Germany",
    squaresTotal:96,
    numberOfSquaresInRow:10,
    groups:[
    {
      name:'a',
      fill: '#FF0000',
      squares:10
    },
    {
      name:'b',
      fill: '#00FF00',
      squares:20
    },
    {
      name:'c',
      fill: '#0000FF',
      squares:20
    },
    {
      name:'d',
      fill: '#FFFF00',
      squares:10
    },
    ]
  },
  render: (args) => <WaffledSquare {...args} />,
}
