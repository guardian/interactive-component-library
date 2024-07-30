export function mergeStyles(firstStyle, secondStyle) {
  if (!firstStyle) return secondStyle
  if (!secondStyle) return firstStyle
  if (typeof firstStyle === "string") {
    if (typeof secondStyle !== "string") {
      throw new Error("Styles to merge must be of the same type")
    }
    return firstStyle.concat(" ", secondStyle)
  }

  const allKeys = new Set([
    ...Object.keys(firstStyle),
    ...Object.keys(secondStyle),
  ])
  const merged = Array.from(allKeys).reduce((result, key) => {
    result[key] = mergeStyles(firstStyle[key], secondStyle[key])
    return result
  }, {})

  return merged
}
