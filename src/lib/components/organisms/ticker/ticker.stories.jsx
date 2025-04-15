import { Ticker } from "."
import { Container } from "$particles"
import { PageSection, ResultSummary } from "$molecules"
import { useRef, useEffect } from "preact/hooks"
import styles from "./stories.module.scss"

const now = Date.now()
const minuteInMilliseconds = 60000

let tickerSection = null

const meta = {
  title: "Organisms/Ticker",
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
      <Ticker
        {...args}
        onStateChange={({ expanded }) => {
          if (!expanded) {
            tickerSection?.scrollIntoView({ behavior: "instant" })
          }
        }}
      >
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
    verticalAtMobile: true,
    items: [...items, ...items],
  },
}

export const TwelveResults = {
  args: {
    maxItems: 9,
    verticalAtMobile: true,
    items: [...items, ...items, ...items, ...items],
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

const itemsSlim = [
  {
    previous: "dem",
    next: "gop",
    title: "Trump flips Arizona, a key swing state",
    text: "",
    isSlim: true,
  },
  {
    previous: "gop",
    next: "gop",
    title: "Trump holds Florida",
    isSlim: true,
  },
  {
    previous: "dem",
    next: "dem",
    title: "Harris holds California",
    isSlim: true,
  },
]

export const VerticalAtMobile = {
  args: {
    verticalAtMobile: true,
    maxItems: 12,
    itemWidth: "100%",
    items: [...itemsSlim, ...itemsSlim, ...itemsSlim, ...itemsSlim],
  },
}

export const HorizontalAtMobile = {
  args: {
    verticalAtMobile: false,
    maxItems: 12,
    itemWidth: "260px",
    items: [...itemsSlim, ...itemsSlim, ...itemsSlim, ...itemsSlim],
  },
}

function StoryContainer({ children }) {
  const tickerSectionRef = useRef()

  useEffect(() => {
    tickerSection = tickerSectionRef.current
  }, [tickerSectionRef])

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
