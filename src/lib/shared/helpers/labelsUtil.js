export function preventOverlap(labelPositions, iteration = 0, labelSize = 12, coordinate = "y", moveBothLabels = true) {
  const maxIterations = 10
  let totalOverlap = 0

  for (let index = 1; index < labelPositions.length; index++) {
    const previousElement = labelPositions[index - 1]
    const element = labelPositions[index]

    const overlap = previousElement[coordinate] - (element[coordinate] - labelSize)
    if (overlap < 0) {
      // no overlap, continue
      continue
    }

    if (moveBothLabels) {
      previousElement[coordinate] -= overlap / 2
      element[coordinate] += overlap / 2
    } else {
      previousElement[coordinate] -= overlap
    }

    totalOverlap += overlap
  }

  if (totalOverlap > 0 && iteration < maxIterations) {
    return preventOverlap(labelPositions, iteration + 1, labelSize, coordinate, moveBothLabels)
  }

  return labelPositions
}

export function uniqueBy(array, key) {
  return [...array.reduce((map, d) => map.set(d[key], d), new Map()).values()]
}

export function positionLabels(labels, labelSize = 12, coordinate = "y", moveBothLabels = true) {
  labels = uniqueBy(labels, "value")
  // sort by coordinate-position
  labels.sort((a, b) => a[coordinate] - b[coordinate])

  return preventOverlap(labels, 0, labelSize, coordinate, moveBothLabels)
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
