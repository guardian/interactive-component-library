import React, { useState, useRef, useEffect } from 'react'

const toNum = (arg) => {
  if (typeof arg === 'number') return arg
  arg && arg !== '' ? Number(arg.replace(/,/g, '.')) : 0
}

const getTotal = (relativeTotal = null, data, numKey) => {
  if (relativeTotal) return relativeTotal
  return data.reduce((acc, p) => acc + toNum(p[numKey]), 0)
}

export function Bar({ data, showNumbers, relativeTotal, numKey, abbrKey, noDataKey, height }) {
  const [total] = useState(getTotal(relativeTotal, data, numKey))
  const rectRefs = useRef([])
  const textRefs = useRef([])
  const [refsReady, setRefsReady] = useState(false)

  useEffect(() => {
    if (refsReady === false && showNumbers) setRefsReady(true)
  }, [data, relativeTotal, textRefs, rectRefs])

  return (
    <>
      {data.map((p, i) => {
        const partialNum = toNum(p[numKey])
        const abbr = p[abbrKey]

        if (partialNum === 0) return

        const x =
          i === 0
            ? 0
            : (data
                .slice(0, i)
                .map((d) => toNum(d[numKey]))
                .reduce((a, b) => a + b) /
                total) *
              100

        const width = (partialNum / total) * 100
        const showText =
          showNumbers &&
          abbr !== noDataKey &&
          textRefs.current[i] &&
          textRefs.current[i].getBBox().width < rectRefs.current[i].getBBox().width

        return (
          <g key={`bar-${i}`}>
            <rect
              ref={(el) => (rectRefs.current[i] = el)}
              shape-rendering="crispEdges"
              id={abbr}
              class={`gv-bar-rect fill-color--${abbr}`}
              x={`${x}%`}
              y={0}
              width={`${width}%`}
              height={height}
            />

            <text
              ref={(el) => (textRefs.current[i] = el)}
              class="gv-bar-text"
              style={{ fill: '#fff', visibility: showText ? 'visible' : 'hidden' }}
              dx={-4}
              x={`${x + width}%`}
              y={height / 2}
              text-anchor="end"
              alignment-baseline="central"
            >
              {partialNum}
            </text>
          </g>
        )
      })}
    </>
  )
}
