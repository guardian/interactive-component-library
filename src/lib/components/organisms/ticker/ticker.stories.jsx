import { Ticker } from '.'
import { Container } from '$particles'
import { PageSection, ResultSummary } from '$molecules'
import styles from './stories.module.scss'

const meta = {
  title: 'Organisms/Ticker',
  component: Ticker,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'leftcol',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: '#f6f6f6' }}>
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
      </div>
    ),
  ],
  render: ({ items, ...args }) => {
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

const now = Date.now()
const minuteInMilliseconds = 6000

const items = [
  {
    previous: 'lab',
    next: 'con',
    title: 'Con gain from Lab',
    text: 'Camberwell and Peckham',
    timestamp: now - minuteInMilliseconds,
  },
  {
    previous: 'con',
    next: 'lab',
    title: 'Lab gain from Con',
    text: 'Chingford',
    timestamp: now - minuteInMilliseconds,
  },
  {
    previous: 'lab',
    next: 'con',
    title: 'Con gain from Lab',
    text: 'Camberwell and Peckham',
    timestamp: now - minuteInMilliseconds,
  },
]

export const ThreeResults = {
  args: {
    items,
  },
}

export const SixResults = {
  args: {
    items: [...items, ...items],
  },
}

export const LongTitleAndText = {
  args: {
    items: [
      {
        previous: 'con',
        next: 'lab',
        title: 'Con’s Iain Duncan Smith loses to Lab',
        text: 'Cumbernauld, Kilsyth and Kirkintilloch East',
        timestamp: now - minuteInMilliseconds,
      },
      ...items,
    ],
  },
}
