import { InfoIcon } from '.'
import { Tooltip } from '$molecules/tooltip'
import { useRef } from 'react'

export default {
  title: 'Particles/InfoIcon',
  component: InfoIcon,
}

function TooltipPreview() {
  const tooltipped = useRef(null)
  return (
    <>
      <div ref={tooltipped} style="width: 100%; height: 300px; background-color: #CCC" />
      <Tooltip for={tooltipped} renderIn="#storybook-root">
        {({ x, y }) => (
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
            <p>hello</p>
            <p>
              x: {x}, y: {y}
            </p>
          </div>
        )}
      </Tooltip>
    </>
  )
}

export const Default = {
  args: {
    onMouseOver: () => {console.log('hello'); return <TooltipPreview />}
  },
  render: (args) => <InfoIcon {...args} />,
}
