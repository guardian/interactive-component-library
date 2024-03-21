import { useState } from "preact/hooks";
import { SvgSquare } from '$particles/svg-square'
import defaultStyles from './style.module.css'

export const WaffledSquare = ({
  name = 'Germany',
  squaresTotal = 96,
  waffleWidth = 100,
  waffleHeight = waffleWidth,
  rowLong = 10,
  squareWidth = waffleWidth / rowLong,
  labelPosX = 0,
  labelPosY = 0,
  groups = []

}) => {

  const rows = [];
  let xPos = 0;
  let yPos = waffleHeight;
  let cont = 0;

  const [hidden, setHidden] = useState(true);

  const colours = [];

  groups.map(group => {

    for (let j = 0; j < group.squares; j++) {
      colours.push(group.fill)
    }

  })

  for (let i = 0; i < squaresTotal; i++) {

    if (i % rowLong == 0) {
      yPos -= squareWidth;
      cont = 0;
    }

    xPos = cont * squareWidth;
    cont++;
    
    rows.push(<SvgSquare className={'name' + i} posX={xPos} posY={yPos} width={squareWidth} fill={colours[i] ? colours[i] : "#dcdcdc"} pointerEvents={"none"} />);
  }

  let rowEnds = squaresTotal % rowLong == 0;

  labelPosX = rowEnds ? 0 : xPos + squareWidth + 2;
  labelPosY = rowEnds ? yPos - 15 : yPos;

  let headerMarginBottom = squaresTotal >= (rowLong * rowLong) && waffleWidth == waffleHeight ? 15 : 4;

  return (
    <div>
      <h2 
      className={[defaultStyles.header]}
      style={{
        marginBottom: headerMarginBottom,
        width: waffleWidth
      }}
      >{name}</h2>

      <div style={{position:"relative"}}>
        <label
        className="label"
          style={{
            position: "absolute",
            transform: `translate(${labelPosX}px,${labelPosY}px)`,
            fontSize: "14px",
            fontFamily: "GuardianTextSans",
            color: "var(--neutral-neutral-46, var(--Neutral-neutral-neutral-46, #707070))",
            webkitTextStrokeWidth: "4px",
            webkitTextStrokeColor: '#fff',
            paintOrder: "stroke fill",
            zIndex:1,
            lineHeight:'8px'
          }}
        >
          {squaresTotal}
        </label>

        <div
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}

          style={{
            width: waffleWidth,
            height: waffleHeight,
            backgroundColor: "var(--Neutral-neutral-neutral-93, #EDEDED)",
            outline: hidden ? 'none' : '2px solid #333'
          }}
        ></div>
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
    </div>

  )
}