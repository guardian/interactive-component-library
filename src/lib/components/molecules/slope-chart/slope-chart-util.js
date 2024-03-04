export function preventOverlap(labelPositions, iteration = 0, labelHeight = 12) {
  const maxIterations = 10
  let totalOverlap = 0

  for (let index = 1; index < labelPositions.length; index++) {
    const previousElement = labelPositions[index - 1]
    const element = labelPositions[index]

    const overlap = previousElement.y - (element.y - labelHeight)
    if (overlap < 0) {
      // no overlap, continue
      continue
    }

    previousElement.y -= overlap / 2
    element.y += overlap / 2

    totalOverlap += overlap
  }

  if (totalOverlap > 0 && iteration < maxIterations) {
    return preventOverlap(labelPositions, iteration + 1)
  }

  return labelPositions
}

export function uniqueBy(array, key) {
  return [...array.reduce((map, d) => map.set(d[key], d), new Map()).values()]
}

export function positionLabels(labels) {
  labels = uniqueBy(labels, 'value')
  // sort by y-position
  labels.sort((a, b) => a.y - b.y)

  return preventOverlap(labels)
}

// same as this one https://gist.github.com/vectorsize/7031902
export function scaleLinear(domain, range) {
  const [domainMin, domainMax] = domain
  const [rangeMin, rangeMax] = range

  const slope = (rangeMax - rangeMin) / (domainMax - domainMin)
  const intercept = rangeMin - slope * domainMin

  return function (x) {
    return slope * x + intercept
  }
}
