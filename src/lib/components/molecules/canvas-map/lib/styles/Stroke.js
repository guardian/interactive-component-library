import { memoise } from "../util/memoise"
import { toRgba } from "../util/toRgba"

export class Stroke {
  constructor(options) {
    this.color = options?.color || "#121212"
    this.width = options?.width || 0.5
    this.opacity = options?.opacity || 1

    this._getRgba = memoise(toRgba)
  }

  getRgba() {
    return this._getRgba(this.color, this.opacity)
  }
}
