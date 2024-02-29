import { Tooltip } from '.'
import { useRef } from 'preact/hooks'

export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
}

function TooltipPreview() {
  const tooltipped = useRef(null)

  return (
    <>
      <div ref={tooltipped} style="width: 100%; height: 300px; background-color: #CCC" />
      <Tooltip for={tooltipped} renderIn="#storybook-root">
        {({ x, y }) => (
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
            <p>Tooltip position</p>
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
  render: () => <TooltipPreview />,
}

function TooltipOverflow() {
  const tooltipped = useRef(null)

  return (
    <>
      <div style="width: 100%; padding: 20px; background-color: #EAF2F8; font-family: var(--text-sans); border: 1px solid #CCC;">
        <p style={{ marginBottom: 10 }}>Tooltip is rendered in this element</p>
        <div ref={tooltipped} style="width: 100%; height: 300px; padding: 20px; background-color: #2980B9;">
          <p>
            Tooltip will show outside of tooltipped element, but never outside the bounds of the element it's rendered
            in.
          </p>
        </div>
      </div>

      <Tooltip for={tooltipped} renderIn="#storybook-root">
        {({ x, y }) => (
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
            <p>Tooltip position</p>
            <p>
              x: {x}, y: {y}
            </p>
          </div>
        )}
      </Tooltip>
    </>
  )
}

export const Overflow = {
  render: () => <TooltipOverflow />,
}
