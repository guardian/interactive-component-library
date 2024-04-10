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

function isObj(obj) {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null
}
