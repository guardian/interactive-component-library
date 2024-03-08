import { useLayoutEffect, useState, useRef } from 'preact/hooks'
import { useWindowSize } from '$shared/hooks/useWindowSize'
import { StackedBar } from '$particles/stacked-bar'
import styles from './style.module.scss'

export function CoalitionsTracker({
  coalitions,
  threshold,
  barChartHeight = 32,
  listMembersAccessor = 'parties',
  listMemberTotalAccessor = 'totalSeats',
  listDescriptionAccessor = 'description',
  abbreviationAccessor = 'abbreviation',
  thresholdTextBold,
  thresholdText,
}) {
  const wrapperRef = useRef(null)
  const thresholdTextRef = useRef(null)
  const [width, setWidth] = useState(0)
  const biggestListTotal = Math.max(
    ...coalitions.map((l) => l[listMembersAccessor].reduce((acc, cur) => acc + cur[listMemberTotalAccessor], 0)),
  )
  const windowSize = useWindowSize()
  const thresholdTextMinWidth = windowSize.width < 740 ? 66 : 150
  const thresholdDotWidth = 11
  const thresholdTextPaddingLeft = 5
  const maxBarWidth = width - thresholdTextMinWidth - (thresholdDotWidth - 1) / 2 - thresholdTextPaddingLeft
  const thresholdLeft = (threshold / biggestListTotal) * maxBarWidth

  const parsedLists = coalitions.map((coalition) => {
    const listTotal = coalition[listMembersAccessor].reduce((acc, cur) => acc + cur[listMemberTotalAccessor], 0)
    return {
      title: coalition['name'],
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

  useLayoutEffect(() => {
    const newWidth = wrapperRef.current.getBoundingClientRect().width
    setWidth(newWidth)
  }, [windowSize])

  const renderCoalition = (list, index) => {
    if (list.width <= 0) {
      return
    }
    return (
      <div key={index} className={styles.coalition} style={{ position: 'relative', zIndex: 2 }}>
        <h4 className={styles.title}>{list.title}</h4>
        <p className={styles.description}>{list.description}</p>
        <StackedBar stack={list.stack} width={list.width} height={barChartHeight} createSVG={true} />
      </div>
    )
  }

  return (
    <div ref={wrapperRef} style={{ width: '100%', position: 'relative' }}>
      <div className={styles.coalitionsContainer}>{parsedLists.map(renderCoalition)}</div>
      <div
        style={{
          position: 'absolute',
          height: thresholdDotWidth,
          width: thresholdDotWidth,
          top: 0,
          left: 0.5 + thresholdLeft - thresholdDotWidth / 2,
          background: '#121212',
          borderRadius: 50,
        }}
      />
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: 1,
          top: 0,
          left: thresholdLeft,
          background: '#121212',
        }}
      />
      <div
        ref={thresholdTextRef}
        className={styles.thresholdText}
        style={{
          position: 'absolute',
          minWidth: thresholdTextMinWidth,
          maxWidth: 150,
          width: 'auto',
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
