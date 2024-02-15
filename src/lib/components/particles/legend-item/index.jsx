export const LegendItem = ({ circleClass, text }) => {
  return (
    <div className="flex items-center">
      <span className={`w-[11px] h-[11px] rounded-full mr-1 shrink-0 ${circleClass}`} />
      <p className="text-neutral-7 shrink">{text}</p>
    </div>
  )
}
