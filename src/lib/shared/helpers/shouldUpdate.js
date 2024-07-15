// @ts-check

/**
 * @template T
 * @param {T} oldState
 * @param {T} newState
 * @returns {boolean}
 */
export default function shouldUpdate(oldState, newState) {
  if (oldState === newState) return false

  if (isObj(oldState) && isObj(newState)) {
    for (let key in newState) {
      if (oldState[key] !== newState[key]) return true
    }
    return false
  }

  return true
}

/**
 *
 * @param {unknown} obj
 * @returns {obj is Record<string, unknown>}
 */
function isObj(obj) {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null
}
