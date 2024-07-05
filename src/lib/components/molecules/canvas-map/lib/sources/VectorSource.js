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
    const [lon, lat] = coordinate
    const features = knn(this._featuresRtree, lon, lat, 10, (d) => d.feature.containsCoordinate(coordinate)).map((d) => {
      const midX = d.minX + (d.minX + d.maxX) / 2
      const midY = d.minY + (d.minY + d.maxY) / 2
      d.distance = Math.hypot(midX - lon, midY - lat)
      return d
    })
    features.sort((a, b) => a.distance - b.distance)
    return features.map((d) => d.feature)
  }

  getFeaturesInExtent(extent) {
    const [minX, minY, maxX, maxY] = extent
    return this._featuresRtree.search({ minX, minY, maxX, maxY }).map((d) => d.feature)
  }

  setFeatures(features) {
    this._featuresRtree.clear()

    for (const feature of features) {
      const [minX, minY, maxX, maxY] = feature.getExtent()
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
