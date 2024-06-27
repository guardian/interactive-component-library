import { memoise } from "../util/memoise"
import { toRgba } from "../util/toRgba"

export class Fill {
  constructor(options) {
    this.color = options?.color || "#CCC"
    this.opacity = options?.opacity || 1

    this._getRgba = memoise(toRgba)
  }

  getRgba() {
    return this._getRgba(this.color, this.opacity)
  }
}
