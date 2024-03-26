import { Ticker } from '.'
import { Container, TickerItem, RelativeTimeSentence } from '$particles'
import { PageSection, ControlChange } from '$molecules'
import styles from './stories.module.scss'

const meta = {
  title: 'Organisms/Ticker',
  component: Ticker,
  parameters: {
    viewport: {
      defaultViewport: 'wide',
    },
  },
  decorators: [
    (Story) => (
      <Container sideBorders={true}>
        <div className={styles.grid}>
          <div className={styles.border} />
          <div className={styles.body}>
            <PageSection>
              {{
                header: <h2>Latest seats declared</h2>,
                content: <Story />,
              }}
            </PageSection>
            <PageSection borderTop={true}>
              {{
                header: <h2>Next section</h2>,
                content: <p className={styles.content}>Section content</p>,
              }}
            </PageSection>
          </div>
        </div>
      </Container>
    ),
  ],
  render: ({ args }) => {
    const timestamp = Date.now()
    const minuteInMilliseconds = 6000

    const items = [
      {
        previous: 'lab',
        next: 'con',
        text: 'Con gain from Lab',
        constituency: 'Camberwell and Peckham',
        timestamp: timestamp - minuteInMilliseconds,
      },
      {
        previous: 'con',
        next: 'lab',
        text: 'Lab gain from Con',
        constituency: 'Chingford',
        timestamp: timestamp - minuteInMilliseconds,
      },
      {
        previous: 'lab',
        next: 'con',
        text: 'Con gain from Lab',
        constituency: 'Camberwell and Peckham',
        timestamp: timestamp - minuteInMilliseconds,
      },
    ]

    return (
      <Ticker>
        {items.map((d, index) => (
          <TickerItem {...args} key={index}>
            <ControlChange {...d} />
            <p className={styles.paragraph}>{d.constituency}</p>
            <RelativeTimeSentence timeStamp={d.timestamp} styles={{ text: styles.relativeTime }} />
          </TickerItem>
        ))}
      </Ticker>
    )
  },
}

export default meta

export const Default = {}
