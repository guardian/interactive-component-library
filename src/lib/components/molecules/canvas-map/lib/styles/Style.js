/**
 * TODO: is this meant to be a subset of the style attr?
 * @type {import("preact/compat").CSSProperties}
 */
export class Style {
  constructor(options) {
    this.stroke = options?.stroke
    this.fill = options?.fill
    this.text = options?.text
  }

  clone() {
    return new Style({
      stroke: this.stroke,
      fill: this.fill,
      text: this.text,
    })
  }
}
