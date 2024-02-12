const DIRECTION = {
  up: 'up',
  down: 'down',
}

export function Chevron({ active = false, direction = DIRECTION.down }) {
  const groupStyles = {
    origin: 'origin-center',
    transform: direction === DIRECTION.down ? 'rotate-0' : 'rotate-180',
  }

  const pathStyles = {
    fill: active ? 'fill-neutral-20' : 'fill-neutral-86',
  }

  return (
    <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className={Object.values(groupStyles).join(' ')} style="transform-box: fill-box;">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.80569 10.7123L11.6344 15H12.365L16.1938 10.7123L15.4997 10L11.9997 13L8.49976 10L7.80569 10.7123Z"
          className={Object.values(pathStyles).join(' ')}
        />
      </g>
    </svg>
  )
}
