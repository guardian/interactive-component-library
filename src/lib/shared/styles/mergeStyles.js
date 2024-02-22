export function mergeStyles(firstStyle, secondStyle) {
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
