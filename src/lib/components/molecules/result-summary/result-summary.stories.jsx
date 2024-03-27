import { ResultSummary } from '.'
import './stories.module.css'

const meta = {
  title: 'Molecules/ResultSummary',
  component: ResultSummary,
}

export default meta

// 2 mins ago
const timestamp = Date.now() - 120000

export const Default = {
  args: {
    previous: 'lab',
    next: 'con',
    title: 'Con gain from Lab',
    text: 'Camberwell and Peckham',
    timestamp,
  },
}
