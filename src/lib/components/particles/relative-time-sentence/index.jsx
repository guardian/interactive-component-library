import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles.js"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

export const RelativeTimeSentence = ({ timeStamp, styles }) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  // dayjs docs: - range of results: https://day.js.org/docs/en/display/from-now#list-of-breakdown-range
  let timeSince = dayjs(timeStamp).fromNow()

  return <span className={styles.dateStampText}>{timeSince}</span>
}
