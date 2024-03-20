import { useState } from "react";
import { SvgSquare } from '$particles/svg-square'

export const WaffledSquare = ({
  squaresTotal = 96,
  waffleWidth = 100,
  waffleHeight = 100,
  rowLong = 10,
  squareWidth = waffleWidth / rowLong,
  labelPosX = 0,
  labelPosY = 0

}) => {

  const rows = [];
  let xPos = 0;
  let yPos = waffleHeight;
  let cont = 0;

  const [hidden, setHidden] = useState(true);

  for (let i = 0; i < squaresTotal; i++) {

    if (i % rowLong == 0) {
      yPos -= squareWidth;
      cont = 0;
    }

    xPos = cont * squareWidth;
    cont++;

    rows.push(<SvgSquare className={'name' + i} posX={xPos} posY={yPos} width={squareWidth} fill={"#dcdcdc"} pointerEvents={"none"} />);
  }

  labelPosX = squaresTotal % rowLong == 0 ? 0 : xPos + squareWidth + 2;
  labelPosY = squaresTotal % rowLong == 0 ? yPos - squareWidth * 2 : yPos - squareWidth + 1;

  return (
    <div>
      <h2 style={{
        color: "var(--Neutral-neutral-neutral-0, #000)",
        fontFamily: "GuardianTextSans",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
        margin: "0 0 4px 0",
        width: waffleWidth
      }}
      >Germany</h2>

      <div style={{position:"relative"}}>

        <label
          style={{
            position: "absolute",
            transform: `translate(${labelPosX}px,${labelPosY}px)`,
            fontSize: "14px",
            color: "var(--neutral-neutral-46, var(--Neutral-neutral-neutral-46, #707070))",
            webkitTextStrokeWidth: "4px",
            webkitTextStrokeColor: '#fff',
            paintOrder: "stroke fill",
            zIndex:1
          }}
        >
          {squaresTotal}
        </label>

        <div
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}

          style={{
            width: waffleWidth,
            height: waffleWidth,
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