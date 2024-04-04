import { Tooltip, TooltipType } from '.'
import { InfoButton } from '$particles'
import { useEffect, useRef, useState } from 'preact/hooks'

export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
}

export const Default = {
  render: () => <TooltipPreview />,
}

export const Modal = {
  render: () => <TooltipPreview type={TooltipType.modal} />,
}

export const Overflow = {
  render: () => <TooltipOverflow />,
}

export const ButtonPress = {
  render: () => <TooltipForButton />,
}

function TooltipPreview({ type }) {
  const tooltipped = useRef(null)
  const [element, setElement] = useState()

  useEffect(() => {
    setElement(tooltipped.current)
  }, [tooltipped])

  return (
    <>
      <div ref={tooltipped} style="width: 100%; height: 300px; background-color: #CCC" />
      {element && (
        <Tooltip for={element} renderIn="#storybook-root" type={type}>
          {({ x, y }) => (
            <div style="border-top: 1px solid #333; background-color: #FFF; padding: 10px;">
              <p>Tooltip position</p>
              <p>
                x: {x}, y: {y}
              </p>
            </div>
          )}
        </Tooltip>
      )}
    </>
  )
}

function TooltipOverflow() {
  const tooltipped = useRef(null)
  const [element, setElement] = useState()

  useEffect(() => {
    setElement(tooltipped.current)
  }, [tooltipped])

  return (
    <>
      <div style="width: 100%; padding: 20px; background-color: #EAF2F8; font-family: var(--text-sans); border: 1px solid #CCC;">
        <p style={{ marginBottom: 10 }}>Tooltip is rendered in this element</p>
        <div ref={tooltipped} style="width: 100%; height: 300px; padding: 20px; background-color: #2980B9;">
          <p>
            Tooltip will show outside of tooltipped element, but never outside the bounds of the element it is rendered
            in.
          </p>
        </div>
      </div>

      {element && (
        <Tooltip for={element} renderIn="#storybook-root">
          {({ x, y }) => (
            <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
              <p>Tooltip position</p>
              <p>
                x: {x}, y: {y}
              </p>
            </div>
          )}
        </Tooltip>
      )}
    </>
  )
}

function TooltipForButton() {
  const [tooltipTarget, setTooltipTarget] = useState()

  useEffect(() => {
    function onClick() {
      setTooltipTarget(null)
    }
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div style={{ height: '100vh' }}>
      <InfoButton
        onClick={(event) => {
          setTooltipTarget((target) => {
            if (target) return null
            return event.target
          })
          event.stopPropagation()
        }}
      />
      {tooltipTarget && (
        <Tooltip for={tooltipTarget} renderIn="#storybook-root">
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">Tooltip</div>
        </Tooltip>
      )}
    </div>
  )
}
