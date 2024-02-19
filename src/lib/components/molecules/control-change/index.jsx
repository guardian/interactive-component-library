import { GradientIcon } from '$particles'

export const ControlChange = ({ previous, next, text }) => (
  <div class="gv-control-change">
    <GradientIcon
      previousStopColor={previous.color}
      nextStopColor={next.color}
      previousAbbreviation={previous.abbreviation}
      nextAbbreviation={next.abbreviation}
    />
    <strong>{text}</strong>
  </div>
)
