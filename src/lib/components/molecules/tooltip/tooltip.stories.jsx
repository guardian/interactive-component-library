import { Tooltip } from "."
import { useTouchOrHover } from "$shared/hooks/useTouchOrHover"
import { InfoButton } from "$particles"
import { useRef } from "preact/hooks"

export default {
  title: "Molecules/Tooltip",
  component: Tooltip,
}

export const Default = {
  render: () => <TooltipPreview />,
}

export const ButtonTouchOrHover = {
  render: () => <TooltipForButton />,
}

function TooltipPreview() {
  const { touchOrHoverRef, touchOrHoverIsActive, positionInTarget } =
    useTouchOrHover()

  return (
    <>
      <div
        ref={touchOrHoverRef}
        style="width: 100%; height: 300px; background-color: #dcdcdc"
      />
      {touchOrHoverIsActive && (
        <Tooltip
          for={touchOrHoverRef.current}
          positionInTarget={positionInTarget}
        >
          <div style="border-top: 1px solid #333; background-color: #FFF; padding: 10px;">
            <p>Tooltip position</p>
            <p>
              x: {positionInTarget.x}, y: {positionInTarget.y}
            </p>
          </div>
        </Tooltip>
      )}
    </>
  )
}

function TooltipForButton() {
  const { touchOrHoverRef, touchOrHoverIsActive, touchRect } = useTouchOrHover()
  const infoButtonRef = useRef()

  return (
    <div style={{ height: "100vh" }}>
      <div
        ref={touchOrHoverRef}
        style={{
          backgroundColor: "#dcdcdc",
          width: 200,
          padding: 12,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p style={{ pointerEvents: "none" }}>
          Tooltip shows when gray area receives touch or mouseover event, but is
          anchored to info button.
        </p>
        <div style={{ width: 20 }}>
          <InfoButton ref={infoButtonRef} />
        </div>
      </div>
      {touchOrHoverIsActive && (
        <Tooltip for={infoButtonRef.current} touchRect={touchRect}>
          <div style="border: 1px solid #333; background-color: #FFF; padding: 10px;">
            Tooltip
          </div>
        </Tooltip>
      )}
    </div>
  )
}
