import { useRef, useState, useMemo } from 'preact/hooks'
import { useContainerSize } from '$shared/hooks/useContainerSize'
import { SvgSquare } from '$particles/svg-square'
import defaultStyles from './style.module.css'

export const WaffledSquare = ({
  name,
  squaresTotal,
  waffleWidth,
  waffleHeight,
  numberOfSquaresInRow,
  squareWidth = waffleWidth / numberOfSquaresInRow,
  labelPosX = 0,
  labelPosY = 0,
  groups = []

}) => {

  const containerRef = useRef(null);
  const size = useContainerSize(containerRef);

  const rows = [];
  let xPos = 0;
  let yPos = waffleHeight;
  let cont = 0;

  const [hidden, setHidden] = useState(true);

  const colours = [];

  groups.map(group => {

    for (let i = 0; i < group.squares; i++) {
      colours.push(group.fill)
    }

  })

  for (let i = 0; i < squaresTotal; i++) {

    if (i % numberOfSquaresInRow == 0) {
      yPos -= squareWidth;
      cont = 0;
    }

    xPos = cont * squareWidth;
    cont++;
    
    rows.push(<rect
      class={'name' + i}
      x={xPos}
      y={yPos}
      width={squareWidth}
      height={squareWidth}
      style={{
        fill:colours[i] ? colours[i] : "#dcdcdc",
        stroke:"#ffffff",
        pointerEvents:"none"
      }}
    />);
  }

  let rowEnds = squaresTotal % numberOfSquaresInRow == 0;

  labelPosX = rowEnds ? 0 : xPos + squareWidth + 2;
  labelPosY = rowEnds ? yPos - 15 : yPos;

  let headerMarginBottom = squaresTotal >= (numberOfSquaresInRow * numberOfSquaresInRow) && waffleWidth == waffleHeight ? 15 : 4;

  const containerStyle = useMemo(() => {
    const style = {}
    if (waffleWidth > 0) style['width'] = waffleWidth
    if (waffleHeight > 0) style['height'] = waffleHeight
    return style
  }, [waffleWidth, waffleHeight])

  return (
    <div ref={containerRef} style={containerStyle}>
      {size && (
      <>
        <h2
          className={[defaultStyles.header]}
          style={{
            marginBottom: headerMarginBottom,
            width: waffleWidth
          }}
        >{name}
        </h2>
        <div style={{position:"relative"}}>
        <label
        className={[defaultStyles.label]}
        style={{
          transform: `translate(${labelPosX}px,${labelPosY}px)`
        }}
        >
          {squaresTotal}
        </label>

        <div
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}
          onClick={() => console.log('set results table')}

          style={{
            width: waffleWidth,
            height: waffleHeight,
            backgroundColor: "var(--Neutral-neutral-neutral-93, #EDEDED)",
            outline: hidden ? 'none' : '2px solid #333'
          }}
        >
        </div>
        <svg
          style={{
            display: 'inline-block',
            pointerEvents: 'none',
            position: "absolute",
            top:0
          }}
          width={waffleWidth}
          height={waffleHeight}
          viewBox={`0 0 ${waffleWidth} ${waffleHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>{rows}</g>
        </svg>
      </div>
      </>
      )}
    </div>

  )
}