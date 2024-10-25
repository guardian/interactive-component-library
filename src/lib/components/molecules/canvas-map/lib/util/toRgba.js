export function toRgba(color, opacity = 1) {
  // Remove spaces and convert to lowercase for uniformity
  color = color.replace(/\s+/g, "").toLowerCase()

  // Check if the color is in hex format
  if (color.startsWith("#")) {
    color = color.replace(/^#/, "")

    // Handle shorthand hex (3 digits)
    if (color.length === 3) {
      color = color
        .split("")
        .map((char) => char + char)
        .join("")
    }

    // Parse r, g, b values
    let r = parseInt(color.substring(0, 2), 16)
    let g = parseInt(color.substring(2, 4), 16)
    let b = parseInt(color.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // Check if the color is in rgb or rgba format
  let rgbaMatch = color.match(/^rgba?\((\d+),(\d+),(\d+)(?:,(\d+(\.\d+)?))?\)$/)
  if (rgbaMatch) {
    let r = parseInt(rgbaMatch[1], 10)
    let g = parseInt(rgbaMatch[2], 10)
    let b = parseInt(rgbaMatch[3], 10)
    let a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : opacity

    return `rgba(${r}, ${g}, ${b}, ${a})`
  }

  throw new Error(`Unsupported color format: ${color}`)
}
