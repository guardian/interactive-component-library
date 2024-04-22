export function preventOverlap(labelPositions, iteration = 0, labelWidth = 20) {
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

    previousElement.x -= overlap / 2
    element.x += overlap / 2

    totalOverlap += overlap
  }

  if (totalOverlap > 0 && iteration < maxIterations) {
    return preventOverlap(labelPositions, iteration + 1)
  }

  return labelPositions
}

export function positionLabels(labels) {
  return preventOverlap(labels)
}