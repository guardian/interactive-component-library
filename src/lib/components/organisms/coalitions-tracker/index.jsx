import { useLayoutEffect, useState, useRef } from "preact/hooks"
import { useWindowSize } from "$shared/hooks/useWindowSize"
import { StackedBar, LabelType, LabelOverlapConfig } from "$particles/stacked-bar"
import defaultStyles from "./style.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export function CoalitionsTracker({
  coalitions,
  threshold,
  barChartHeight = 32,
  listMembersAccessor = "parties",
  listMemberTotalAccessor = "totalSeats",
  listDescriptionAccessor = "description",
  abbreviationAccessor = "abbreviation",
  thresholdTextBold,
  thresholdText,
  styles,
  labelOverlapConfig = LabelOverlapConfig,
}) {
  const wrapperRef = useRef(null)
  const thresholdTextRef = useRef(null)
  const [width, setWidth] = useState(0)
  const biggestListTotal = Math.max(...coalitions.map((l) => l[listMembersAccessor].reduce((acc, cur) => acc + cur[listMemberTotalAccessor], 0)))
  const windowSize = useWindowSize()
  const thresholdTextMinWidth = windowSize.width < 740 ? 66 : 150
  const thresholdDotWidth = 11
  const thresholdTextPaddingLeft = 5
  const maxBarWidth = width - thresholdTextMinWidth - (thresholdDotWidth - 1) / 2 - thresholdTextPaddingLeft
  const thresholdLeft = (threshold / biggestListTotal) * maxBarWidth

  const parsedLists = coalitions.map((coalition) => {
    const listTotal = coalition[listMembersAccessor].reduce((acc, cur) => acc + cur[listMemberTotalAccessor], 0)
    return {
      title: coalition["name"],
      description: coalition[listDescriptionAccessor],
      height: barChartHeight,
      width: (listTotal / biggestListTotal) * maxBarWidth,
      stack: coalition[listMembersAccessor]
        .map((m) => {
          const listTotal = coalition[listMembersAccessor].reduce((acc, cur) => acc + cur[listMemberTotalAccessor], 0)

          return {
            label: m[listMemberTotalAccessor],
            fraction: m[listMemberTotalAccessor] / listTotal,
            abbreviation: m[abbreviationAccessor],
          }
        })
        .sort((a, b) => b.fraction - a.fraction),
    }
  })

  styles = mergeStyles(defaultStyles, styles)

  useLayoutEffect(() => {
    const newWidth = wrapperRef.current.getBoundingClientRect().width
    setWidth(newWidth)
  }, [windowSize])

  const renderCoalition = (list, index) => {
    if (list.width <= 0) {
      return
    }
    return (
      <div key={index} className={styles.coalition} style={{ position: "relative", zIndex: 2 }}>
        <h4 className={styles.title}>{list.title}</h4>
        <p className={styles.description} style={{ maxWidth: thresholdLeft <= 620 ? thresholdLeft - 8 : 620 }}>
          {list.description}
        </p>
        <StackedBar labelOverlapConfig={labelOverlapConfig} labelType={LabelType.hanging} stack={list.stack} width={list.width} height={barChartHeight} createSVG={true} />
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className={styles.coalitionsWrapper}>
      <div className={styles.coalitionsContainer}>{parsedLists.map(renderCoalition)}</div>
      <div
        className={styles.thresholdDot}
        style={{
          position: "absolute",
          height: thresholdDotWidth,
          width: thresholdDotWidth,
          top: 0,
          left: 0.5 + thresholdLeft - thresholdDotWidth / 2,
        }}
      />
      <div
        className={styles.thresholdLine}
        style={{
          position: "absolute",
          height: "100%",
          width: 1,
          top: 0,
          left: thresholdLeft,
        }}
      />
      <div
        ref={thresholdTextRef}
        className={styles.thresholdText}
        style={{
          position: "absolute",
          minWidth: thresholdTextMinWidth,
          width: "auto",
          top: -(thresholdDotWidth + 1) / 2,
          left: thresholdLeft + (thresholdDotWidth - 1) / 2 + thresholdTextPaddingLeft,
        }}
      >
        {thresholdTextBold && <span className={styles.thresholdTextBold}>{thresholdTextBold}</span>}
        {thresholdText && <span>{thresholdText}</span>}
      </div>
    </div>
  )
}
