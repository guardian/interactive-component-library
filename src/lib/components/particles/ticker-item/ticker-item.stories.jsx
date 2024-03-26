import { TickerItem } from '.'
import { ControlChange } from '$molecules'
import { RelativeTimeSentence } from '$particles'
import styles from './stories.module.css'

const meta = {
  title: 'Particles/TickerItem',
  component: TickerItem,
  render: ({ args }) => {
    // 2 mins ago
    const timestamp = Date.now() - 120000
    return (
      <TickerItem {...args}>
        <ControlChange previous="lab" next="con" text="Con gain from Lab" />
        <p className={styles.paragraph}>Camberwell and Peckham</p>
        <RelativeTimeSentence timeStamp={timestamp} />
      </TickerItem>
    )
  },
}

export default meta

export const Default = {}
