export function mergeStyles(firstStyle, secondStyle) {
  if (!secondStyle) return firstStyle
  if (typeof firstStyle === 'string') {
    if (typeof secondStyle !== 'string') {
      throw new Error('Styles to merge must be of the same type')
    }
    return firstStyle.concat(' ', secondStyle)
  }

  const merged = Object.keys(firstStyle).reduce((result, key) => {
    let className = firstStyle[key]
    if (secondStyle && key in secondStyle) {
      className = className.concat(' ', secondStyle[key])
    }
    result[key] = className
    return result
  }, {})

  return merged
}
