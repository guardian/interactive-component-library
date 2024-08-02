import defaultStyles from "./style.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const SquareCutCornerIcon = ({
  cornerColor,
  squareColor,
  squareSize,
  styles,
}) => {
  styles = mergeStyles({ ...defaultStyles }, styles)

  let cornerSize = squareSize * 0.625
  let cornerMargin = squareSize < 100 ? squareSize / 6 : 10 // margin should increase with the size of square but cap at 10px

  return (
    <svg
      width={squareSize}
      height={squareSize}
      className={styles.svg}
      viewBox={`0 0 ${squareSize} ${squareSize}`}
    >
      <g id="square-cutoff-corner-icon">
        <rect
          id="square"
          fill={squareColor}
          className={styles.square}
          width={squareSize}
          height={squareSize}
        />

        <g id="corner">
          <polygon
            id="cornerTriangleBg"
            className={styles.dividingLineColor}
            points={`0,0 0,${cornerSize} ${cornerSize},0`}
          />

          <polygon
            id="cornerTriangle"
            fill={cornerColor}
            className={styles.corner}
            points={`0,0 0,${cornerSize - cornerMargin} ${
              cornerSize - cornerMargin
            },0`}
          />
        </g>
      </g>
    </svg>
  )
}
