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
  if (padding) {
    size = [size[0] - padding.left - padding.right, size[1] - padding.top - padding.bottom]
  }
  return size
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
    right: Math.round(padding.top * ratio),
    bottom: Math.round(padding.top * ratio),
    left: Math.round(padding.left * ratio),
  }
  return scaled
}
