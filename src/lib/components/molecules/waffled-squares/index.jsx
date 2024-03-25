import { useRef, useState, useLayoutEffect, useMemo } from 'preact/hooks'
import { useWindowSize } from '$shared/hooks/useWindowSize'
import defaultStyles from './style.module.css'

export const WaffledSquare = ({
  name,
  squaresTotal,
  numberOfSquaresInRow,
  labelPosX = 0,
  labelPosY = 0,
  groups = []

}) => {

  const containerRef = useRef(null)
  const size = useWindowSize()
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const newWidth = containerRef.current.getBoundingClientRect().width
    setWidth(newWidth)
  }, [size])

  const rows = [];
  let xPos = 0;
  let yPos = size.height;
  let cont = 0;

  const [hidden, setHidden] = useState(true);

  const colours = [];

  const squareWidth = size.width / numberOfSquaresInRow;

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
    
    rows.push(
      <rect
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
      />
    );
  }

  let rowEnds = squaresTotal % numberOfSquaresInRow == 0;

  labelPosX = rowEnds ? 0 : xPos + squareWidth + 2;
  labelPosY = rowEnds ? yPos - 15 : yPos;

  let headerMarginBottom = squaresTotal >= (numberOfSquaresInRow * numberOfSquaresInRow) && size.width == size.height ? 15 : 4;



  return (
    <div ref={containerRef} style={size} class={'waffledSquaresContainer'} >
      {size && (
      <>
        <h2
          className={[defaultStyles.header]}
          style={{
            marginBottom: headerMarginBottom,
            width: size.width
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
            width: size.width,
            height: size.height,
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
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
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