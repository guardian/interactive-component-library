import { Ticker } from '.'
import { Container, RelativeTimeSentence } from '$particles'
import { PageSection, ControlChange, ResultSummary } from '$molecules'
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
        title: 'Con gain from Lab',
        text: 'Camberwell and Peckham',
        timestamp: timestamp - minuteInMilliseconds,
      },
      {
        previous: 'con',
        next: 'lab',
        title: 'Lab gain from Con',
        text: 'Chingford',
        timestamp: timestamp - minuteInMilliseconds,
      },
      {
        previous: 'lab',
        next: 'con',
        title: 'Con gain from Lab',
        text: 'Camberwell and Peckham',
        timestamp: timestamp - minuteInMilliseconds,
      },
    ]

    return (
      <Ticker {...args}>
        {items.map((d, index) => (
          <ResultSummary {...d} key={index} />
        ))}
      </Ticker>
    )
  },
}

export default meta

export const Default = {}
