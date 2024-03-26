import { useRef, useState, useLayoutEffect, useMemo } from 'preact/hooks'
import { useWindowSize } from '$shared/hooks/useWindowSize'
import { useContainerSize } from '$shared/hooks/useContainerSize'
import defaultStyles from './style.module.css'

export const WaffledSquare = ({
  name,
  width,
  height,
  squaresTotal,
  numberOfSquaresInRow,
  labelPosX = 0,
  labelPosY = 0,
  groups = []

}) => {

  const containerRef = useRef()
  const containerSize = useContainerSize(containerRef)
  const containerStyle = useMemo(() => {
    const style = {}
    if (width > 0) style['width'] = width
    if (height > 0) style['width'] = width
    return style
  }, [width,height])


  // useLayoutEffect(() => {
  //   const newWidth = containerRef.current.getBoundingClientRect().width
  //   setWidth(newWidth)
  // }, [size])

  // const rows = [];
  // let xPos = 0;
  // let yPos = height;
  // let cont = 0;

  // const [hidden, setHidden] = useState(true);

  // const colours = [];



  //const squareWidth = containerwidth ? width / numberOfSquaresInRow : 0;

  // groups.map(group => {

  //   for (let i = 0; i < group.squares; i++) {
  //     colours.push(group.fill)
  //   }

  // })

  // for (let i = 0; i < squaresTotal; i++) {

  //   if (i % numberOfSquaresInRow == 0) {
  //     yPos -= squareWidth;
  //     cont = 0;
  //   }

  //   xPos = cont * squareWidth;
  //   cont++;
    
  //   rows.push(
  //     <rect
  //       class={'name' + i}
  //       x={xPos}
  //       y={yPos}
  //       width={squareWidth}
  //       height={squareWidth}
  //       style={{
  //         fill:colours[i] ? colours[i] : "#dcdcdc",
  //         stroke:"#ffffff",
  //         pointerEvents:"none"
  //       }}
  //     />
  //   );
  // }

  // let rowEnds = squaresTotal % numberOfSquaresInRow == 0;

  // labelPosX = rowEnds ? 0 : xPos + squareWidth + 2;
  // labelPosY = rowEnds ? yPos - 15 : yPos;

  // let headerMarginBottom = squaresTotal >= (numberOfSquaresInRow * numberOfSquaresInRow) && width == height ? 15 : 4;

  return (
    
    <div ref={containerRef} style={containerStyle} class={defaultStyles.container} >
      {containerSize && (
      <>
      {console.log(containerSize)}
        <h2
          className={[defaultStyles.header]}
          style={{
            //marginBottom: headerMarginBottom,
            width: width
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
            width: width,
            height: height,
            backgroundColor: "var(--Neutral-neutral-neutral-93, #EDEDED)",
            //outline: hidden ? 'none' : '2px solid #333'
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
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>{}</g>
        </svg>
      </div>
      </>
      )}
    </div>

  )
}