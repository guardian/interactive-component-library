export const HalfLineText = ({ text, height }) =>
  <svg width='100%' height={height}>
    <text x='50%' y={0} style={{ textAnchor: 'middle', alignmentBaseline: 'hanging' }}>{text}</text>
  </svg>