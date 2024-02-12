function preventOverlap(labelPositions, iteration = 0, labelHeight = 12) {
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

function positionLabels(items, key, yScale, abbrKey, x, paddingTop) {
  // deduplicate values
  const deduplicated = [...items.reduce((map, obj) => map.set(obj[key], obj), new Map()).values()]

  const initialPositions = deduplicated.map((item) => {
    return {
      x,
      y: yScale(item[key]) + paddingTop + 4,
      value: item[key],
      key: item[abbrKey],
    }
  })
  // sort by y-position
  initialPositions.sort((a, b) => a.y - b.y)

  return preventOverlap(initialPositions)
}

function scaleLinear(domain, range) {
  const [domainMin, domainMax] = domain
  const [rangeMin, rangeMax] = range

  const slope = (rangeMax - rangeMin) / (domainMax - domainMin)
  const intercept = rangeMin - slope * domainMin

  return function (x) {
    return slope * x + intercept
  }
}

export { positionLabels, scaleLinear }
