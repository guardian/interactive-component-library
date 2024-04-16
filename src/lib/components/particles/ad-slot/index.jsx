import { useEffect } from 'preact/hooks'

/**
 * Array of available breakpoints.
 * @typedef {"mobile" | "phablet" | "tablet" | "desktop"} Breakpoint
 *
 * Type representing an ad size, defined as a tuple of two numbers in the format [width, height].
 * @typedef {[number, number]} AdSize
 *
 * Type representing a size mapping for different breakpoints,
 * the breakpoints cascade from the smallest to the largest.
 * AKA if only mobile and desktop are defined, the mobile size will be used for phablet and tablet.
 *
 * @typedef {Partial<Record<Breakpoint, AdSize[]>>} SizeMapping
 *
 * @interface AdSlotProps
 * @property {string} name - The unique name of the ad slot.
 * @property {SizeMapping} sizeMapping - The size mapping for the ad slot.
 *
 */

/**
 * A placeholder for an ad slot, the commercial bundle will fill this slot with an ad,
 * matching the size mapping.
 *
 * @param {AdSlotProps} props
 * @returns {React.ComponentElement<AdSlotProps, null>}
 */
export function AdSlot({ name, sizeMapping }) {
  const slotId = `dfp-ad--${name}`
  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('gu.commercial.slot.fill', {
        detail: {
          slotId,
          name,
          additionalSizes: sizeMapping,
        },
      }),
    )
  })
  return (
    <div className="ad-slot-container">
      <div
        id={slotId}
        className="js-ad-slot ad-slot interactive-ad-slot"
        data-link-name="ad slot interactive"
        data-name="interactive"
        aria-hidden="true"
      />
    </div>
  )
}
