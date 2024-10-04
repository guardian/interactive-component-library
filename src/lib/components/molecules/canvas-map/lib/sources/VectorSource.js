import RBush from "rbush"
import knn from "rbush-knn"
import { Dispatcher, MapEvent } from "../events"

export class VectorSource {
  /**
   * @param {Object} props
   * @param {import("../Feature").Feature[]} props.features
   */
  constructor({ features }) {
    this.dispatcher = new Dispatcher(this)
    this._featuresRtree = new RBush()
    this.setFeatures(features)
  }

  tearDown() {
    this.dispatcher = null
  }

  /**
   * @returns {import("../Feature").Feature[]}
   */
  getFeatures() {
    return this._features
  }

  /**
   * @param {[number, number]} coordinate
   * @returns {import("../Feature").Feature[]}
   */
  getFeaturesAtCoordinate(coordinate) {
    const [x, y] = coordinate
    const items = knn(this._featuresRtree, x, y, 10, (d) => {
      return d.feature.containsCoordinate(coordinate)
    }).map((d) => {
      const midX = d.minX + (d.minX + d.maxX) / 2
      const midY = d.minY + (d.minY + d.maxY) / 2
      d.distance = Math.hypot(midX - x, midY - y)
      return d
    })

    items.sort((a, b) => a.distance - b.distance)
    return items.map((d) => d.feature)
  }

  /**
   * @param {[number, number, number, number]} extent TODO: should this be an `Extent`?
   * @returns {import("../Feature").Feature[]}
   */
  getFeaturesInExtent(extent) {
    const [minX, minY, maxX, maxY] = extent

    const features = this._featuresRtree
      .search({ minX, minY, maxX, maxY })
      .map((d) => d.feature)

    return features
  }

  /**
   * @param {import("../Feature").Feature[]} features
   */
  setFeatures(features) {
    this._featuresRtree.clear()

    for (const feature of features) {
      const { minX, minY, maxX, maxY } = feature.getExtent()
      this._featuresRtree.insert({
        minX: Math.floor(minX),
        minY: Math.floor(minY),
        maxX: Math.ceil(maxX),
        maxY: Math.ceil(maxY),
        feature,
      })
    }

    this._features = features
    this.dispatcher.dispatch(MapEvent.CHANGE)
  }
}
