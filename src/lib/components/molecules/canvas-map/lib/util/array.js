/**
 * @param {Array<any>|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array<any>|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */
export function arrayEquals(arr1, arr2) {
  const len1 = arr1.length
  if (len1 !== arr2.length) {
    return false
  }
  for (let i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }
  return true
}
