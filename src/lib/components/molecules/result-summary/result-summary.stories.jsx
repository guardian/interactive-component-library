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
  },
}
