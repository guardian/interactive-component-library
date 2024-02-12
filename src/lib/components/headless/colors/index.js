export const PartyBackgroundColors = {
  con: 'bg-party-con',
  lab: 'bg-party-lab',
  ld: 'bg-party-ld',
  ukip: 'bg-party-ukip',
  ind: 'bg-party-ind',
  snp: 'bg-party-snp',
  sdlp: 'bg-party-sdlp',
  pc: 'bg-party-pc',
  sf: 'bg-party-sf',
  dup: 'bg-party-dup',
  green: 'bg-party-green',
  alliance: 'bg-party-alliance',
  uup: 'bg-party-uup',
  reform: 'bg-party-reform',
  other: 'bg-party-other',
}

// Source: https://gist.github.com/krabs-github/ec56e4f1c12cddf86ae9c551aa9d9e04
export function isDarkColor(color) {
  let r, g, b
  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +`0x${color.slice(1).replace(color.length < 5 && /./g, '$&$&')}`

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 140) {
    return false
  }
  return true
}

export function isLightColor(color) {
  return !isDarkColor(color)
}