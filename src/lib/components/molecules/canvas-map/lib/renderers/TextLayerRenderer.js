import { FeatureRenderer } from "./FeatureRenderer"
import { replaceChildren } from "../util/dom"

export class TextLayerRenderer {
  /**
   * @param {import("../layers/TextLayer").TextLayer} layer
   */
  constructor(layer) {
    /**
     * @type {import("../layers/TextLayer").TextLayer}
     */
    this.layer = layer
    this.featureRenderer = new FeatureRenderer()

    this._element = document.createElement("div")
    this._element.className = "gv-text-layer"
    const style = this._element.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"
    style.pointerEvents = "none"
    style.overflow = "hidden"
  }

  renderFrame(frameState, targetElement) {
    if (this.layer.opacity === 0) return targetElement

    const { declutterTree } = frameState
    const { projection, viewPortSize, sizeInPixels, visibleExtent, transform } =
      frameState.viewState

    // set opacity
    this._element.style.opacity = `${this.layer.opacity}`

    const source = this.layer.source
    const features = source.getFeaturesInExtent(visibleExtent)

    /** @type {CanvasRenderingContext2D} */
    let canvasCtx

    const textElements = []

    for (const feature of features) {
      // get point geometry
      const geometries = feature.getProjectedGeometries(projection)
      const point = geometries.find((d) => d.type === "Point")
      if (!point) {
        throw new Error(
          `Expected Point geometry for feature in TextLayer: ${feature}`,
        )
      }

      const styleFunction =
        feature.getStyleFunction() || this.layer.getStyleFunction()

      const featureStyle = styleFunction(feature, transform.k)

      // get text element
      const textElement = this.getTextElementWithID(feature.uid)
      textElement.innerText = featureStyle.text.content

      const [canvasX, canvasY] = transform.apply(point.coordinates)
      const [relativeX, relativeY] = [
        canvasX / sizeInPixels[0],
        canvasY / sizeInPixels[1],
      ]

      const position = this.getElementPosition(featureStyle.text, {
        x: relativeX,
        y: relativeY,
      })

      // Apply style to text element, and receive measured size from DOM
      const elementDimens = this.styleTextElement(
        textElement,
        featureStyle.text,
        position,
      )

      const bbox = this.getElementBBox(elementDimens, featureStyle.text, {
        x: relativeX * viewPortSize[0],
        y: relativeY * viewPortSize[1],
      })

      // skip item if it collides with existing elements
      if (declutterTree) {
        if (declutterTree.collides(bbox)) {
          continue
        }

        // add element to declutter tree to prevent collisions
        declutterTree.insert(bbox)
      }

      const callout = featureStyle?.text?.callout
      const icon = featureStyle?.text?.icon

      if (callout || icon) {
        canvasCtx ??= this.getOrCreateContainer(
          targetElement,
          sizeInPixels,
        ).firstElementChild.getContext("2d")
      }

      if (callout) {
        // Offsets are given in pixels, which we must scale to match canvas resolution
        const canvasOffsetX =
          (callout.offsetBy.x - callout.leaderGap) * window.devicePixelRatio

        const canvasOffsetY = callout.offsetBy.y * window.devicePixelRatio

        canvasCtx.beginPath()

        canvasCtx.moveTo(canvasX, canvasY)
        canvasCtx.lineTo(canvasX + canvasOffsetX / 2, canvasY + canvasOffsetY)
        canvasCtx.moveTo(canvasX + canvasOffsetX / 2, canvasY + canvasOffsetY)
        canvasCtx.lineTo(canvasX + canvasOffsetX, canvasY + canvasOffsetY)

        canvasCtx.strokeStyle = callout.leaderColor
        canvasCtx.lineWidth = callout.leaderWidth
        canvasCtx.stroke()

        canvasCtx.closePath()
      }

      if (icon) {
        canvasCtx.beginPath()
        canvasCtx.save()

        let iconPosX = relativeX * viewPortSize[0]
        let iconPosY = relativeY * viewPortSize[1]

        if (callout) {
          iconPosX += callout.offsetBy.x
          iconPosY += callout.offsetBy.y
        }

        if (icon.position === "right") {
          iconPosX += elementDimens.width
        } else if (icon.position === "left") {
          iconPosX += icon.padding + icon.size / 2
        }

        canvasCtx.translate(
          iconPosX * window.devicePixelRatio,
          iconPosY * window.devicePixelRatio,
        )

        this.drawTextIcon(canvasCtx, icon)

        canvasCtx.restore()
        canvasCtx.closePath()
      }

      if (this.layer.drawCollisionBoxes) {
        const collisionBoxDebugElement = this.getCollisionBoxElement(bbox)
        textElements.push(collisionBoxDebugElement)
      }

      textElements.push(textElement)
    }

    replaceChildren(this._element, textElements)

    return this._element
  }

  getTextElementWithID(id) {
    const elementId = `text-feature-${id}`
    let textElement = this._element.querySelector(`#${elementId}`)
    if (!textElement) {
      textElement = document.createElement("div")
      textElement.id = elementId
    }
    return textElement
  }

  styleTextElement(element, textStyle, position) {
    const style = element.style

    style.position = "absolute"
    style.left = position.left
    style.top = position.top
    style.textAlign = "center"
    style.whiteSpace = "nowrap"

    style.fontFamily = textStyle.fontFamily
    style.fontSize = textStyle.fontSize
    style.fontWeight = textStyle.fontWeight
    style.lineHeight = textStyle.lineHeight
    style.color = textStyle.color
    style.textShadow = textStyle.textShadow

    const { width, height } = this.getElementSize(element)

    style.transform = textStyle.getTransform(width, height)

    return { width, height }
  }

  getElementSize(element) {
    if (!element.parentElement) {
      document.body.appendChild(element)
    }

    const { width, height } = element.getBoundingClientRect()

    if (element.parentElement !== this._element) {
      element.remove()
    }

    return { width, height }
  }

  /**
   * @param {{ height: number, width: number }} dimens
   * @param {import("../styles/Text").Text} textStyle
   * @param {{x: number, y: number}} position
   */
  getElementBBox(dimens, textStyle, position) {
    const collisionPadding = {
      top: 2,
      right: 2,
      bottom: 2,
      left: 2,
    }

    const { x: translateX, y: translateY } = textStyle.getTranslation(
      dimens.width,
      dimens.height,
    )

    let minX = position.x + translateX - collisionPadding.left
    let minY = position.y + translateY - collisionPadding.top

    let maxX =
      minX + dimens.width + collisionPadding.left + collisionPadding.right
    let maxY =
      minY + dimens.height + collisionPadding.top + collisionPadding.bottom

    if (textStyle.callout) {
      minX += textStyle.callout.offsetBy.x
      minY += textStyle.callout.offsetBy.y
      maxX += textStyle.callout.offsetBy.x
      maxY += textStyle.callout.offsetBy.y
    }

    if (textStyle.icon) {
      if (
        textStyle.icon.position === "left" ||
        textStyle.icon.position === "right"
      ) {
        maxX += textStyle.icon.size + textStyle.icon.padding
      }

      const iconSizeHeightDiff = textStyle.icon.size - dimens.height

      if (iconSizeHeightDiff > 0) {
        minY -= iconSizeHeightDiff / 2
        maxY += iconSizeHeightDiff / 2
      }
    }

    minX = Math.floor(minX)
    minY = Math.floor(minY)
    maxX = Math.ceil(maxX)
    maxY = Math.ceil(maxY)

    return {
      minX,
      minY,
      maxX,
      maxY,
    }
  }

  /**
   * @param {import("../styles/Text").Text} textStyle
   * @param {{x: number, y: number}} position
   */
  getElementPosition(textStyle, position) {
    if (textStyle.callout) {
      if (textStyle.icon.position === "left") {
        return {
          left: `calc(${position.x * 100}% + ${textStyle.callout.offsetBy.x + (textStyle.icon.size + textStyle.icon.padding * 2)}px)`,
          top: `calc(${position.y * 100}% + ${textStyle.callout.offsetBy.y}px)`,
        }
      }

      if (textStyle.icon.position === "right") {
        return {
          left: `calc(${position.x * 100}% + ${textStyle.callout.offsetBy.x}px)`,
          top: `calc(${position.y * 100}% + ${textStyle.callout.offsetBy.y}px)`,
        }
      }

      return {
        left: `calc(${position.x * 100}% + ${textStyle.callout.offsetBy.x}px)`,
        top: `calc(${position.y * 100}% + ${textStyle.callout.offsetBy.y}px)`,
      }
    }

    if (
      textStyle.icon &&
      (textStyle.icon.position === "left" ||
        textStyle.icon.position === "right")
    ) {
      return {
        left: `calc(${position.x * 100}% + ${textStyle.icon.size + textStyle.icon.padding * 2}px)`,
        top: `${position.y * 100}%`,
      }
    }

    return {
      left: `${position.x * 100}%`,
      top: `${position.y * 100}%`,
    }
  }

  getCollisionBoxElement(bbox) {
    const element = document.createElement("div")
    const style = element.style

    style.position = "absolute"
    style.left = `${bbox.minX}px`
    style.top = `${bbox.minY}px`
    style.width = `${bbox.maxX - bbox.minX}px`
    style.height = `${bbox.maxY - bbox.minY}px`
    style.border = "1px solid red"

    return element
  }

  // NOTE: these are just copied over from VectorLayerRenderer - is there a nicer way of doing this?
  getOrCreateContainer(targetElement, sizeInPixels) {
    let container = null
    let containerReused = false
    let canvas = targetElement && targetElement.firstElementChild
    if (canvas instanceof HTMLCanvasElement) {
      // use container from previously rendered layer
      container = targetElement
      containerReused = true
    } else if (this._container) {
      // reuse existing container for this layer
      container = this._container
    } else {
      // Create new container
      container = this.createContainer()
    }

    if (!containerReused) {
      // setting the size of the canvas also clears it
      const canvas = container.firstElementChild
      canvas.width = sizeInPixels[0]
      canvas.height = sizeInPixels[1]
    }

    this._container = container
    return container
  }
  createContainer() {
    const container = document.createElement("div")
    container.className = "gv-map-layer"

    let style = container.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"

    const canvas = document.createElement("canvas")
    style = canvas.style
    style.position = "absolute"
    style.width = "100%"
    style.height = "100%"
    container.appendChild(canvas)

    return container
  }

  /**
   * Draws a `Text` element's icon on the canvas.
   *
   * Expects the canvas context to be translated to the text element's position.
   *
   * TODO: support more shapes?
   *
   * @param {CanvasRenderingContext2D} context
   * @param {import("../styles/Text").IconOptions} icon
   */
  drawTextIcon(context, icon) {
    if (icon.shape === "circle") {
      context.arc(
        0,
        0,
        (icon.size * devicePixelRatio) / 2,
        0,
        2 * Math.PI,
        false,
      )

      if (icon.style) {
        icon.style.fill?.drawInContext(context)

        if (icon.style.stroke) {
          context.lineWidth = icon.style.stroke.width
          context.strokeStyle = icon.style.stroke.getRgba()
          context.stroke()
        }
      } else if (icon.color) {
        context.fillStyle = icon.color
        context.fill()
      }
    }
  }
}
