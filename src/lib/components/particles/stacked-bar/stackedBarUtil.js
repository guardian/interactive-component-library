export function preventOverlap(labelPositions, iteration = 0, labelWidth = 12) {
  const maxIterations = 10
  let totalOverlap = 0

  for (let index = 1; index < labelPositions.length; index++) {
    const previousElement = labelPositions[index - 1]
    const element = labelPositions[index]

    const overlap = previousElement.x - (element.x - labelWidth)
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
  labels.sort((a, b) => a.x - b.x)

  return preventOverlap(labels)
}


const configLabel = (labelType, itemWidth, barHeight) => {
  if (labelType === 'inline') {
    return {
      x: itemWidth - 4,
      y: barHeight / 2,
      textAnchor: 'end',
      alignmentBaseline: 'central',
    }
  }

  if (labelType === 'bottom') {
    return {
      x: itemWidth,
      y: barHeight + 4,
      textAnchor: 'end',
      alignmentBaseline: 'hanging',
    }
  }
}

export { configLabel }