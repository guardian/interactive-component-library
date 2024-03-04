import { DisplayNumbers } from '$particles'

export const ToplineResult = ({ name, total, change, icon }) => (
  <div class="gv-topline-result">
    <div><span>{name}</span>{icon}</div>
    <DisplayNumbers total={total} change={change} />
  </div>
)
