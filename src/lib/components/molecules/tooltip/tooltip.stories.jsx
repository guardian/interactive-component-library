import { Tooltip } from '.'
import { useTouchOrHover } from './useTouchOrHover'
import { InfoButton } from '$particles'
import { useEffect, useRef, useState } from 'preact/hooks'

export default {
  title: 'Molecules/Tooltip',
  component: Tooltip,
}

export const Default = {
  render: () => <TooltipPreview />,
}

export const ButtonTouchOrHover = {
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

function TooltipForButton() {
  const { touchOrHoverRef, touchOrHoverIsActive } = useTouchOrHover()
  const infoButtonRef = useRef()

  return (
    <div style={{ height: '100vh' }}>
      <div
        ref={touchOrHoverRef}
        style={{
          backgroundColor: '#dcdcdc',
          width: 200,
          padding: 12,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <p>
          Tooltip shows when gray area receives touch or mouseover event, but is anchored to info button.
        </p>
        <div style={{width: 20}}>
          <InfoButton ref={infoButtonRef} />
        </div>
      </div>
      {touchOrHoverIsActive && (
        <Tooltip for={infoButtonRef.current}>
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">Tooltip</div>
        </Tooltip>
      )}
    </div>
  )
}
