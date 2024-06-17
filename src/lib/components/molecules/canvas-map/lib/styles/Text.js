export class Text {
  constructor(options) {
    this.content = options?.content
    this.fontFamily = options?.fontFamily || "var(--text-sans)"
    this.fontSize = options?.fontSize || "17px"
    this.fontWeight = options?.fontWeight || "400"
    this.lineHeight = options?.lineHeight || 1.3
    this.color = options?.color || "#121212"
    this.textShadow = options?.textShadow || "1px 1px 0px white, -1px -1px 0px white, -1px 1px 0px white, 1px -1px white"
  }
}
