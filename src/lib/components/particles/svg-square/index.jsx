//const fitBounds = (bounds) => {
    
export const SvgSquare = ({
    className = "svg-square",
    posX = 0,
    posY = 0,
    width = 10,
    height = width,
    fill = "#ff0000",
    stroke = "#fff",
    pointerEvents = 'auto'
}) => {


    return (
        <rect class={className} x={posX} y={posY} width={width} height={height} style = {`fill:${fill}; stroke:${stroke}; pointer-events:${pointerEvents}`}/>
    )
}

