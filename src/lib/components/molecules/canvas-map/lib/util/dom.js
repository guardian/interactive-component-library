/**
 * Transform the children of a parent node so they match the
 * provided list of children.  This function aims to efficiently
 * remove, add, and reorder child nodes while maintaining a simple
 * implementation (it is not guaranteed to minimize DOM operations).
 * @param {Node} node The parent node whose children need reworking.
 * @param {Array<Node>} children The desired children.
 */
export function replaceChildren(node, children) {
  const oldChildren = node.childNodes
  let done = false

  for (let i = 0; !done; ++i) {
    const oldChild = oldChildren[i]
    const newChild = children[i]

    // check if our work is done
    if (!oldChild && !newChild) {
      done = true
      break
    }

    // check if children match
    if (oldChild === newChild) {
      continue
    }

    // check if a new child needs to be added
    if (!oldChild) {
      node.appendChild(newChild)
      continue
    }

    // check if an old child needs to be removed
    if (!newChild) {
      node.removeChild(oldChild)
      --i
      continue
    }

    // reorder
    node.insertBefore(newChild, oldChild)
  }
}
