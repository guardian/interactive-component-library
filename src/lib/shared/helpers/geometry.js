// Function to check if two rectangles intersect
export function rectsIntersect(rect1, rect2) {
  // Check if either rectangle is actually a line
  if (
    rect1.width === 0 ||
    rect1.height === 0 ||
    rect2.width === 0 ||
    rect2.height === 0
  ) {
    return false
  }

  // Check for no intersection by comparing positions
  if (
    rect1.x + rect1.width <= rect2.x ||
    rect2.x + rect2.width <= rect1.x ||
    rect1.y + rect1.height <= rect2.y ||
    rect2.y + rect2.height <= rect1.y
  ) {
    return false
  }

  // If above conditions are false, the rectangles intersect
  return true
}

// Function to check if a point is inside a rectangle
export function pointInsideRect(point, rect) {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  )
}

// Function to check if a rectangle is inside another rectangle
export function rectInsideRect(rect1, rect2) {
  return (
    rect1.x >= rect2.x &&
    rect1.x + rect1.width <= rect2.x + rect2.width &&
    rect1.y >= rect2.y &&
    rect1.y + rect1.height <= rect2.y + rect2.height
  )
}
