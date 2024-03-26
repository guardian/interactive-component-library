
import { useRef, useMemo, useLayoutEffect, useState } from 'preact/hooks'
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
    const rows = [];
    let xPos = 0;
    let yPos = 0;
    let cont = 0;
    let squareWidth = 0;
    let colours = [];
    let headerMarginBottom;

    groups.map(group => {

        for (let i = 0; i < group.squares; i++) {
            colours.push(group.fill)
        }
      
    })

    const [hidden, setHidden] = useState(true);
    const containerRef = useRef()
    const [isReady, setIsReady] = useState(false);
    useLayoutEffect(() => {
      if (!isReady) {
        setIsReady(true)
      }
    }, [isReady])

    const containerSize = useContainerSize(containerRef)
    const containerStyle = useMemo(() => {
      const style = {}
      if (width > 0) style['width'] = width
      if (height > 0) style['height'] = width
      return style
    }, [width, height])

    if(isReady){

        yPos = containerSize.width;
       
        squareWidth = containerSize.width / numberOfSquaresInRow;

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
                    fill:colours[i] ? colours[i] : "#f6f6f6",
                    stroke:"#ffffff",
                    pointerEvents:"none"
                    }}
                />
            );
        }

        let rowEnds = squaresTotal % numberOfSquaresInRow == 0;

        labelPosX = rowEnds ? 0 : xPos + squareWidth + 2;
        labelPosY = rowEnds ? yPos - 15 : yPos;

        headerMarginBottom = squaresTotal >= (numberOfSquaresInRow * numberOfSquaresInRow) && width == height ? 15 : 4;

    }

    return (
        <div ref={containerRef} style={containerStyle} class={defaultStyles.container} >
        {containerSize && (
        <>
          <h2
            className={[defaultStyles.header]}
            style={{
              marginBottom: headerMarginBottom,
              width: containerSize.width
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
              width: containerSize.width,
              height: containerSize.width,
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
            width={containerSize.width}
            height={containerSize.width}
            viewBox={`0 0 ${containerSize.width} ${containerSize.width}`}
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
