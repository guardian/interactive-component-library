import { ResultSummary } from "."
import styles from "./stories.module.css"

const meta = {
  title: "Molecules/ResultSummary",
  component: ResultSummary,
  decorators: [
    (Story) => {
      return (
        <div className={styles.storyBg}>
          <Story />
        </div>
      )
    },
  ],
}

export default meta

// 2 mins ago
const timestamp = Date.now() - 120000

export const Default = {
  args: {
    previous: "lab",
    next: "con",
    title: "Con gain from Lab",
    text: "Camberwell and Peckham",
    timestamp,
    lineClamp: false,
  },
}

export const Slim = {
  args: {
    previous: "gop",
    next: "dem",
    title: "Harris flips Arizona, a key swing state",
    timestamp,
    isSlim: true,
  },
}

export const SlimPlusLineClamping = {
  args: {
    previous: "gop",
    next: "dem",
    title:
      "Harris flips Arizona, a key swing state and lots of long text which should be cut off after 2 lines",
    timestamp,
    isSlim: true,
    lineClamp: true,
  },
}
