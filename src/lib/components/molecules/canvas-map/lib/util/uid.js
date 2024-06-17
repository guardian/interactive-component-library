let _uidCounter = 0

/**
 * Generates a unique ID for an object. Unique IDs are generated
 * as a strictly increasing sequence.
 */
export function createUid() {
  return String(++_uidCounter)
}
