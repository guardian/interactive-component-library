import RBush from "rbush"
import knn from "rbush-knn"
import { Dispatcher, MapEvent } from "../events"

export class VectorSource {
  constructor({ features }) {
    this.dispatcher = new Dispatcher(this)

    // create spatial index
    this._featuresRtree = new RBush()
    this.setFeatures(features)
  }

  tearDown() {
    this.dispatcher = null
  }

  getFeatures() {
    return this._features
  }

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

  getFeaturesInExtent(extent) {
    const [minX, minY, maxX, maxY] = extent

    const features = this._featuresRtree
      .search({ minX, minY, maxX, maxY })
      .map((d) => d.feature)

    return features
  }

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

    debugger

    this._features = features
    this.dispatcher.dispatch(MapEvent.CHANGE)
  }
}
