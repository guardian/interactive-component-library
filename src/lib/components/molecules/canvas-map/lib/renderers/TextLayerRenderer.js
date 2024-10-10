import { FeatureRenderer } from "./FeatureRenderer"
import { replaceChildren } from "../util/dom"
import { MapEvent } from "../events"

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
    style.overflow = "hidden"

    // Pointer events are disabled even when we have listeners attached, click/hover events will fire but
    // only for child elements, not the whole text layer. This means the most foreground text layer
    // container won't block other layers from receiving click events.
    style.pointerEvents = "none"

    this._mouseInteractionsEnabled =
      this.layer.onClick || this.layer.onHover || this.layer.restyleOnHover

    this.attachClickAndHoverListeners()
  }

  /**
   * @param {import("./MapRenderer").CanvasSingleton} canvasSingleton
   */
  renderFrame(frameState, canvasSingleton) {
    if (this.layer.opacity === 0) return null

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

      const featureStyle = styleFunction(
        feature,
        transform.k,
        this._hoveredFeature === feature,
      )

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
        canvasCtx ??= canvasSingleton.getContext2d()
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

      // TODO: should we draw icons with SVG? add them into the textlayer? it'd make a lot of the
      // maths easier!
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
      // @ts-ignore
      textElement.dataset.featureId = id
    }

    if (this._mouseInteractionsEnabled) {
      textElement.style.pointerEvents = "auto"
      textElement.style.cursor = "pointer"
    }

    return textElement
  }

  /**
   * @param {HTMLDivElement} element
   * @param {import("../styles/Text").Text} textStyle
   * @param {{left: string, top: string}} position
   */
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

    let { width, height } = this.getElementSize(element)

    if (textStyle.icon) {
      const iconSize = textStyle.icon.size

      // Add padding to text element where icon will appear, mainly so clicks on the icon will be
      // captured on the text element
      if (textStyle.icon.position === "left") {
        style.paddingLeft = `${iconSize + textStyle.icon.padding * 2}px`
      } else if (textStyle.icon.position === "right") {
        style.paddingRight = `${iconSize + textStyle.icon.padding * 2}px`
      }

      const iconSizeHeightDiff = iconSize - height

      if (iconSizeHeightDiff > 0) {
        style.paddingTop = `${iconSizeHeightDiff / 2}px`
        style.paddingBottom = `${iconSizeHeightDiff / 2}px`
      }
    }

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
      return {
        left: `calc(${position.x * 100}% + ${textStyle.callout.offsetBy.x}px)`,
        top: `calc(${position.y * 100}% + ${textStyle.callout.offsetBy.y}px)`,
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

  attachClickAndHoverListeners() {
    if (this.layer.onClick) {
      this._element.addEventListener("click", (event) => {
        if (!event.target) return

        const clickedFeature = this.layer.source
          .getFeatures()
          .find((feature) => event.target.dataset?.featureId === feature.uid)

        if (!clickedFeature) return

        this.layer.onClick(clickedFeature, event)
      })
    }

    if (this.layer.onHover) {
      this._element.addEventListener("mouseover", (event) => {
        if (!event.target) return

        const hoveredFeature = this.layer.source
          .getFeatures()
          .find((feature) => event.target.dataset?.featureId === feature.uid)

        if (!hoveredFeature) return

        const onHoverLeave = this.layer.onHover(hoveredFeature, event)

        if (onHoverLeave) {
          this._element.addEventListener("mouseout", onHoverLeave, {
            once: true,
          })
        }
      })
    }

    if (this.layer.restyleOnHover) {
      this._element.addEventListener("mouseover", (event) => {
        if (!event.target) return

        const hoveredFeature = this.layer.source
          .getFeatures()
          .find((feature) => event.target.dataset?.featureId === feature.uid)

        if (!hoveredFeature) return

        this._hoveredFeature = hoveredFeature
        // TODO: do we need to redraw the whole map here?
        this.layer.dispatcher.dispatch(MapEvent.CHANGE)

        this._element.addEventListener(
          "mouseout",
          () => {
            this._hoveredFeature = undefined
            this.layer.dispatcher.dispatch(MapEvent.CHANGE)
          },
          { once: true },
        )
      })
    }
  }
}
