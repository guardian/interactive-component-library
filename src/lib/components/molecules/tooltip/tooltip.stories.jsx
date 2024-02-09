import { Tooltip } from '.'
export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
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
  args: props, // the args key is required for the fields to show in storybook.
  render: (args) => (
    <>
      <div style="width: 100%; height: 300px;" />
      <Tooltip {...args} containerBounds={document.body.getBoundingClientRect()}>
        <div>Child Content</div>
      </Tooltip>
    </>
  ),
}
