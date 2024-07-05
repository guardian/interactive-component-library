/**
 * Determines if a size has a positive area.
 */
export function hasArea(size) {
  return size[0] > 0 && size[1] > 0
}

/**
 * Calculate size minus padding
 */
export function sizeMinusPadding(size, padding) {
  let newSize = [...size]
  if (padding) {
    newSize = [size[0] - padding.left - padding.right, size[1] - padding.top - padding.bottom]
  }
  return newSize
}

/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 */
export function scaleSize(size, ratio, dest) {
  if (dest === undefined) {
    dest = [0, 0]
  }
  dest[0] = (size[0] * ratio + 0.5) | 0
  dest[1] = (size[1] * ratio + 0.5) | 0
  return dest
}

/**
 * Returns padding object scaled by a ratio
 */
export function scalePadding(padding, ratio) {
  const scaled = {
    top: Math.round(padding.top * ratio),
    right: Math.round(padding.right * ratio),
    bottom: Math.round(padding.bottom * ratio),
    left: Math.round(padding.left * ratio),
  }
  return scaled
}

export function sizeForElement(element) {
  const computedStyle = getComputedStyle(element)
  if (!computedStyle) return null

  let size
  const width =
    element.offsetWidth -
    parseFloat(computedStyle["borderLeftWidth"]) -
    parseFloat(computedStyle["paddingLeft"]) -
    parseFloat(computedStyle["paddingRight"]) -
    parseFloat(computedStyle["borderRightWidth"])
  const height =
    element.offsetHeight -
    parseFloat(computedStyle["borderTopWidth"]) -
    parseFloat(computedStyle["paddingTop"]) -
    parseFloat(computedStyle["paddingBottom"]) -
    parseFloat(computedStyle["borderBottomWidth"])
  if (!isNaN(width) && !isNaN(height)) {
    size = [width, height]
    if (!hasArea(size) && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)) {
      console.warn("No map visible because the map container's width or height are 0.")
    }
  }

  return size
}
