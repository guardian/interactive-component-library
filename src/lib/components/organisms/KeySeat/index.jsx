import React from 'react'
//import ControlChange
//import SlopeChart

export const KeySeat = ({ result, headline, copy, imgSrc }) => {
  ;<div>
    <div class="gv-key-seat__topline">
      <div>
        <div dangerouslySetInnerHTML={{ __html: headline }}></div>
        {/* <ControlChange previous={ } current={ } /><span>{relativeDate(timestamp goes here)}</span> */}
      </div>
      <img src={imgSrc} class="gv-key-seat__locator" />
    </div>
    <div class="gv-key-seat__content">
      <p>{copy}</p>
      <SlopeChart />
    </div>
  </div>
}
