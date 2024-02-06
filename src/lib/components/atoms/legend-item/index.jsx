export const LegendItem = ({ circleClass, text }) => {
  return (
    <div className="flex items-center">
      <span className={`w-[11px] h-[11px] rounded-full mr-1 ${circleClass}`}></span>
      <p className="text-neutral-7">{text}</p>
    </div>
  )
}
