export function mergeStyles(firstStyle, secondStyle) {
  if (!secondStyle) return firstStyle
  if (typeof firstStyle === 'string') {
    if (typeof secondStyle !== 'string') {
      throw new Error('Styles to merge must be of the same type')
    }
    return firstStyle.concat(' ', secondStyle)
  }

  const allKeys = new Set([...Object.keys(firstStyle), ...Object.keys(secondStyle)])
  const merged = Array.from(allKeys).reduce((result, key) => {
    const classNames = []
    if (firstStyle && key in firstStyle) {
      classNames.push(firstStyle[key])
    }

    if (secondStyle && key in secondStyle) {
      classNames.push(secondStyle[key])
    }

    result[key] = classNames.join(' ')
    return result
  }, {})

  return merged
}
