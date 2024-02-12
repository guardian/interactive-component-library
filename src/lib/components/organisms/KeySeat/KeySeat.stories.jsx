import { KeySeat } from '.'

const meta = {
  title: 'Organisms/KeySeat',
  component: KeySeat,
}

export default meta

const data = [
  {
    party: 'Con',
    elected: 20,
    overallSeats: 20,
    change: 6,
    percentageSeats: '60.606',
    losses: false,
    hasSeats: true,
    prevSeats: 14,
    marginLeft: 50,
    width: 11.1,
  },
  {
    party: 'Lab',
    elected: 4,
    overallSeats: 4,
    change: 2,
    percentageSeats: '12.121',
    losses: false,
    hasSeats: true,
    prevSeats: 2,
    marginLeft: 50,
    width: 3.7,
  },
  {
    party: 'LibDem',
    elected: 2,
    overallSeats: 2,
    change: -1,
    percentageSeats: '6.061',
    losses: true,
    hasSeats: true,
    prevSeats: 3,
    marginLeft: 48.1,
    width: 1.9,
  },
  {
    party: 'Green',
    elected: 1,
    overallSeats: 1,
    change: 0,
    percentageSeats: '3.030',
    losses: false,
    hasSeats: true,
    prevSeats: 1,
    marginLeft: 50,
    width: 0,
  },
]

const args = {}

export const Default = {
  args,
  render: (args) => <KeySeat {...args} />,
}
