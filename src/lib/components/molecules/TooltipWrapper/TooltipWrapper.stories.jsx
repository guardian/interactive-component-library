import React from 'react'
import { TooltipWrapper } from '.'
export default {
  title: 'Molecules/TooltipWrapper',
  component: TooltipWrapper,
}

// some test props
const width = 300
const bboxTop = 0
const containerRef = { current: document.body }
const innerWidth = window.innerWidth
const innerHeight = window.innerHeight

const props = {
  width,
  bboxTop,
  containerRef,
  innerWidth,
  innerHeight,
}

export const Default = {
  args: props, //the args key is required for the fields to show in storybook.
  render: (args) => (
    <TooltipWrapper {...args} containerBounds={document.body.getBoundingClientRect()}>
      <div>Child Content</div>
    </TooltipWrapper>
  ),
}
