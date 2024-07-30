import { mergeStyles } from "$styles/helpers/mergeStyles"
import defaultStyles from "./style.module.css"
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
 * @property {Object} styles - The styles for the ad slot.
 */

/**
 * A placeholder for an ad slot, the commercial bundle will fill this slot with an ad,
 * matching the size mapping.
 *
 * @param {AdSlotProps} props
 * @returns {React.ComponentElement<AdSlotProps, null>}
 */
export function AdSlot({ name, sizeMapping, styles }) {
  const slotId = `dfp-ad--${name}`

  styles = mergeStyles(defaultStyles, styles)

  const mobileSizes = sizeMapping.mobile
    ?.map((size) => size.join(","))
    .join("|")
  const tabletSizes = sizeMapping.tablet
    ?.map((size) => size.join(","))
    .join("|")
  const desktopSizes = sizeMapping.desktop
    ?.map((size) => size.join(","))
    .join("|")

  return (
    <div className={["ad-slot-container", styles.container].join(" ")}>
      <div
        id={slotId}
        className={[
          "js-ad-slot",
          "ad-slot",
          "interactive-ad-slot",
          styles.slot,
        ].join(" ")}
        data-link-name={`ad slot ${name}`}
        data-name={`${name}`}
        data-label-show="true"
        ad-label-text="Advertisement"
        aria-hidden="true"
        data-mobile={mobileSizes}
        data-tablet={tabletSizes}
        data-desktop={desktopSizes}
      />
    </div>
  )
}
