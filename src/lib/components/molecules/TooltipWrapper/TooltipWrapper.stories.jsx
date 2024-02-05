import { TooltipWrapper } from '.'
import React, { useRef, useEffect } from 'react'

const width = 300
const bboxTop = 0
const containerRef = { current: document.body }
const containerBounds = document.body.getBoundingClientRect()
const innerWidth = window.innerWidth
const innerHeight = window.innerHeight

console.log('containerBounds', containerBounds)

export default {
  title: 'Molecules/TooltipWrapper',
  component: TooltipWrapper,
  args: {
    width,
    bboxTop,
    containerRef,
    containerBounds,
    innerWidth,
    innerHeight,
    children: <div>Child Content</div>,
  },
}

export const Default = <TooltipWrapper />
