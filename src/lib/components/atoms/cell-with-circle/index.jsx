export const CellWithCircle = ({ circleClass, text }) => {
  return (
    <div className="flex items-center">
      <span className={`w-[11px] h-[11px] rounded-full mr-1 ${circleClass}`}></span>
      <p>{text}</p>
    </div>
  )
}
