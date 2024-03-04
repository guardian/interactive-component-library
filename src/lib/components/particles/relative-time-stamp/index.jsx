import defaultStyles from './style.module.css'
import { mergeStyles } from '$styles/helpers/mergeStyles.js'
import dayjs from 'dayjs'
import {relativeTime} from "./day-js-relative-time-plugin.js"
dayjs.extend(relativeTime)

export const RelativeTimeStamp = ({timeStamp, styles}) => {

    styles = mergeStyles({...defaultStyles}, styles)

    // dayjs docs: - range of results: https://day.js.org/docs/en/display/from-now#list-of-breakdown-range
    let timeSince = dayjs(timeStamp).fromNow()

    return (
        <span className={styles.timestamptext}>
            &nbsp;{timeSince}
        </span>
    )
}
