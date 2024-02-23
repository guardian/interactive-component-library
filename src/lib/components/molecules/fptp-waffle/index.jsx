import { Waffle, HalfLineText } from '$particles'

export const FPTPWaffle = ({ total, units, rows, abbreviationAccessor, halfLineTextHeight, paddingTop, onMouseOver, squares }) =>
  <div class='gv-fptp-waffle'>
    <HalfLineText text={`${Math.ceil(total / 2)} for a majority`} height={halfLineTextHeight} />
    <Waffle total={total} paddingTop={paddingTop} abbreviationAccessor={abbreviationAccessor} showHalfLine={true} squares={squares} onMouseOver={onMouseOver} units={units} rows={rows} />
  </div>