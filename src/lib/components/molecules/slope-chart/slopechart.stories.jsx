import { SlopeChart } from '.'

const meta = {
  title: 'Molecules/SlopeChart',
  component: SlopeChart,
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
    styles: {
      line: 'stroke-color--con',
      circle: 'fill-color--con',
    },
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
    styles: {
      line: 'stroke-color--lab',
      circle: 'fill-color--lab',
    },
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
    styles: {
      line: 'stroke-color--libdem',
      circle: 'fill-color--libdem',
    },
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
    styles: {
      line: 'stroke-color--green',
      circle: 'fill-color--green',
    },
  },
]

const totalSeats = 40

const args = {
  id: 'slope-chart',
  slopeChartItems: data,
  padding: { left: 20, right: 60, top: 20, bottom: 20 },
  domain: [0, totalSeats],
  previousValueKey: 'prevSeats',
  nextValueKey: 'overallSeats',
  abbreviationKey: 'party',
  previousLabel: '2019',
  nextLabel: '2024',
}

export const Default = {
  args,
  render: (args) => <SlopeChart {...args} />,
}
