// @ts-check

/**
 * @template {Record<string, unknown>} T
 * @param {T[]} labelPositions
 * @param {number} iteration
 * @param {number} labelSize
 * @param {string} coordinate
 * @param {boolean} moveBothLabels
 * @returns
 */
export function preventOverlap(labelPositions, iteration = 0, labelSize = 12, coordinate = "y", moveBothLabels = true) {
  const maxIterations = 10
  let totalOverlap = 0

  if (!isArrayWithCoordinates(labelPositions, coordinate)) return labelPositions

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

/**
 * Unique objects for a given key’s value;
 *
 * @example
 * ```
 * const labels = [
 *  {key: 'alpha', value: 1 },
 *  {key: 'alpha', value: 9 },
 *  {key: 'delta', value: 4 },
 *];
 * console.log(uniqueBy(labels, 'key'));
 * // [
 * //  {key: 'alpha', value: 1 },
 * //  {key: 'delta', value: 4 },
 * // ]
 * ```
 *
 * @template T extends Record<string, unknown>
 * @param {T[]} array
 * @param {keyof T} key
 * @returns {T[]}
 */
export function uniqueBy(array, key) {
  return [...array.reduce((map, d) => map.set(d[key], d), new Map()).values()]
}

/**
 * @template {{ value: string }} T
 * @param {T[]} labels
 * @param {number} labelSize
 * @param {string} coordinate
 * @param {boolean} moveBothLabels
 * @returns {T[]}
 */
export function positionLabels(labels, labelSize = 12, coordinate = "y", moveBothLabels = true) {
  labels = uniqueBy(labels, "value")
  // sort by coordinate-position
  labels.sort((a, b) => a[coordinate] - b[coordinate])

  return preventOverlap(labels, 0, labelSize, coordinate, moveBothLabels)
}

/**
 * Create a function that maps a value from a source domain to a target range.
 *
 * same as this one https://gist.github.com/vectorsize/7031902
 *
 * @param {[number, number]} domain
 * @param {[number, number]} range
 * @returns {(x: number) => number}
 */
export function scaleLinear(domain, range) {
  const [domainMin, domainMax] = domain
  const [rangeMin, rangeMax] = range

  const slope = (rangeMax - rangeMin) / (domainMax - domainMin)
  const intercept = rangeMin - slope * domainMin

  return function (x) {
    return slope * x + intercept
  }
}

/**
 * Ensures that all items in the array have a coordinate of type `number`
 *
 * @template {Record<string, unknown>} T
 * @template {string} K
 * @param {T[]} labelPositions
 * @param {K} coordinate
 * @returns {labelPositions is Array<T & { [key in K]: number }>}
 */
function isArrayWithCoordinates(labelPositions, coordinate) {
  return labelPositions.every((position) => typeof position[coordinate] === "number")
}
