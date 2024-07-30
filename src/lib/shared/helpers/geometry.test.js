import { expect, test } from "vitest"
import { rectsIntersect, pointInsideRect, rectInsideRect } from "./geometry"

test("intersect function", () => {
  const rect1 = { x: 0, y: 0, width: 50, height: 50 }
  const rect2 = { x: 30, y: 30, width: 50, height: 50 }
  const rect3 = { x: 100, y: 100, width: 50, height: 50 }

  expect(rectsIntersect(rect1, rect2)).toBe(true)
  expect(rectsIntersect(rect1, rect3)).toBe(false)
})

test("pointInsideRect function", () => {
  const rect = { x: 0, y: 0, width: 50, height: 50 }
  const insidePoint = { x: 25, y: 25 }
  const outsidePoint = { x: 100, y: 100 }

  expect(pointInsideRect(insidePoint, rect)).toBe(true)
  expect(pointInsideRect(outsidePoint, rect)).toBe(false)
})

test("rectInsideRect function", () => {
  const rect1 = { x: 10, y: 10, width: 20, height: 20 }
  const rect2 = { x: 5, y: 5, width: 30, height: 30 }
  const rect3 = { x: 0, y: 0, width: 10, height: 10 }

  expect(rectInsideRect(rect1, rect2)).toBe(true)
  expect(rectInsideRect(rect1, rect3)).toBe(false)
})
