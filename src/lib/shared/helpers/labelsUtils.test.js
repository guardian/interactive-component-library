// @ts-check
import { describe, expect, test } from "vitest"
import { preventOverlap, scaleLinear } from "./labelsUtil"

describe("scaleLinear", () => {
  test("identical domain and range", () => {
    const scale = scaleLinear([0, 100], [0, 100])
    expect(scale(50)).toBe(50)
  })

  test("double scale", () => {
    const scale = scaleLinear([-1, 1], [-2, 2])
    expect(scale(60)).toBe(120)
  })

  test("shift and shrink", () => {
    const scale = scaleLinear([-500, -600], [0, 20])
    expect(scale(-580)).toBe(16)
  })
})

describe("positionLabels", () => {
  test("no overlap", () => {
    const labels = /** @satisfies {{value: string; y: number}[]} */ ([
      { value: "One", y: 100 },
      { value: "Two", y: 200 },
      { value: "Three", y: 300 },
    ])
    expect(preventOverlap(labels)).toEqual([
      { value: "One", y: 100 },
      { value: "Two", y: 200 },
      { value: "Three", y: 300 },
    ])
  })

  test("overlaps", () => {
    const labels = /** @satisfies {{value: string; y: number}[]} */ ([
      { value: "One", y: 120 },
      { value: "Two", y: 125 },
      { value: "Three", y: 130 },
    ])

    expect(preventOverlap(labels)).toEqual([
      { value: "One", y: 113.00000333786011 },
      { value: "Two", y: 124.99999833106995 },
      { value: "Three", y: 136.99999833106995 },
    ])
  })

  test("different axis, three iterations, larger label", () => {
    const labels = /** @satisfies {{value: string; axis: number}[]} */ ([
      { value: "One", axis: 120 },
      { value: "Two", axis: 125 },
      { value: "Three", axis: 130 },
    ])

    expect(preventOverlap(labels, 3, 20, "axis")).toEqual([
      { value: "One", axis: 105.00045776367188 },
      { value: "Two", axis: 124.99977111816406 },
      { value: "Three", axis: 144.99977111816406 },
    ])
  })
})
