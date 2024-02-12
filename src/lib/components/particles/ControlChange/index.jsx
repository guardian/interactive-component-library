import React from 'react'

export const ControlChange = ({ previous, current, string }) => (
  <div class="gv-control-change">
    <svg
      style={{ display: 'inline-block', marginRight: 4, transform: 'translateY(-1px)' }}
      width="24"
      height="11"
      viewBox="0 0 24 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 5.434C0 2.43288 2.43288 0 5.434 0H5.69626C6.85818 0 7.9797 0.426401 8.84813 1.19834C10.6456 2.79612 13.3544 2.79612 15.1519 1.19834C16.0203 0.426401 17.1418 0 18.3037 0L18.566 0C21.5671 0 24 2.43288 24 5.434V5.566C24 8.56712 21.5671 11 18.566 11H18.3037C17.1418 11 16.0203 10.5736 15.1519 9.80166C13.3544 8.20388 10.6456 8.20388 8.84813 9.80166C7.9797 10.5736 6.85818 11 5.69626 11H5.434C2.43288 11 0 8.56712 0 5.566V5.434Z"
        fill="url(#paint0_linear_2141_25984)"
      />
      <defs>
        <linearGradient id="paint0_linear_2141_25984" x1="5.5" y1="5.5" x2="12" y2="5.5" gradientUnits="userSpaceOnUse">
          <stop class={`stop-color--${previous.abbr}`} />
          <stop class={`stop-color--${current.abbr}`} offset="1" />
        </linearGradient>
      </defs>
    </svg>
    <strong>{string}</strong>
  </div>
)
