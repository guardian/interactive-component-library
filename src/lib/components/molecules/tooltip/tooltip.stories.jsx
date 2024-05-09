import { Tooltip } from '.'
import { InfoButton } from '$particles'
import { useEffect, useRef, useState } from 'preact/hooks'

export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
}

export const Default = {
  render: () => <TooltipPreview />,
}

export const ButtonPress = {
  render: () => <TooltipForButton />,
}

function TooltipPreview() {
  const tooltipped = useRef(null)
  const [element, setElement] = useState()

  useEffect(() => {
    setElement(tooltipped.current)
  }, [tooltipped])

  return (
    <>
      <div ref={tooltipped} style="width: 100%; height: 300px; background-color: #CCC" />
      {element && (
        <Tooltip for={element}>
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

function TooltipForButton({ event = "click" }) {
  const [tooltipTarget, setTooltipTarget] = useState()

  useEffect(() => {
    function onClick() {
      setTooltipTarget(null)
    }
    window.addEventListener(event, onClick)

    return () => {
      window.removeEventListener(event, onClick)
    }
  }, [event])

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
        <Tooltip for={tooltipTarget}>
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">Tooltip</div>
        </Tooltip>
      )}
    </div>
  )
}
