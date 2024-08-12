import { arrayEquals } from "./array"

/**
 * Wraps a function in another function that remembers the last return.  If the
 * returned function is called twice in a row with the same arguments and the same
 * this object, it will return the value from the first call in the second call.
 * @function
 * @template ReturnType
 * @param {function(...any): ReturnType} fn - The function to memoise
 * @returns {function(...any): ReturnType} The memoised function
 */
export function memoise(fn) {
  let called = false

  /** @type {ReturnType} */
  let lastResult

  /** @type {Array<any>} */
  let lastArgs

  let lastThis

  return function (...args) {
    const nextArgs = Array.prototype.slice.call(args)
    if (!called || this !== lastThis || !arrayEquals(nextArgs, lastArgs)) {
      called = true
      lastThis = this
      lastArgs = nextArgs
      lastResult = fn.apply(this, args)
    }
    return lastResult
  }
}
