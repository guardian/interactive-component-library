import { Ticker } from "."
import { Container } from "$particles"
import { PageSection, ResultSummary } from "$molecules"
import { useRef } from "preact/hooks"
import styles from "./stories.module.scss"

const now = Date.now()
const minuteInMilliseconds = 60000

const meta = {
  title: "Organisms/Ticker2",
  component: Ticker,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile",
    },
  },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  render: ({ items, ...args }) => {
    return (
      <Ticker {...args}>
        {items.map((d, index) => (
          <ResultSummary
            {...d}
            timestamp={now - minuteInMilliseconds * index}
            key={index}
          />
        ))}
      </Ticker>
    )
  },
}

export default meta

const items = [
  {
    previous: "lab",
    next: "con",
    title: "Con gain from Lab",
    text: "Camberwell and Peckham",
  },
  {
    previous: "con",
    next: "lab",
    title: "Lab gain from Con",
    text: "Chingford",
  },
  {
    previous: "lab",
    next: "con",
    title: "Con gain from Lab",
    text: "Camberwell and Peckham",
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
        previous: "con",
        next: "lab",
        title: "Con’s Iain Duncan Smith loses to Lab",
        text: "Cumbernauld, Kilsyth and Kirkintilloch East",
      },
      {
        previous: "lab",
        next: "con",
        title: "Con gain from Lab",
        text: "Camberwell and Peckham",
      },
      {
        previous: "con",
        next: "lab",
        title: "Con’s Jane Doe loses to Lab",
        text: "Tottenham",
      },
      ...items,
    ],
  },
}

function StoryContainer({ children }) {
  const tickerSectionRef = useRef()

  return (
    <div className={styles.storyContainer}>
      <Container sideBorders={true}>
        <div className={styles.grid}>
          <div className={styles.border} />
          <div className={styles.body}>
            <PageSection ref={tickerSectionRef}>
              {{
                header: <h2>Latest seats declared</h2>,
                content: children,
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
  )
}
