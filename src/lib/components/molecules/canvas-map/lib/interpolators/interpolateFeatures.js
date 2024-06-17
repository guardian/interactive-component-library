export function interpolateFeatures(currentFeatures, newFeatures, { interpolate, separate, combine }) {
  if (currentFeatures.length !== newFeatures.length) {
    throw new Error("interpolateFeatures expects an equal number of features for start and end")
  }

  const featureInterpolators = []
  for (let i = 0; i < currentFeatures.length; i++) {
    const geometryInterpolators = []

    const currentGeometries = currentFeatures[i].geometries
    const newGeometries = newFeatures[i].geometries

    if (newGeometries.length === currentGeometries.length) {
      for (let e = 0; e < currentGeometries.length; e++) {
        const currentGeometry = currentGeometries[e]
        const newGeometry = newGeometries[e]
        if (currentGeometry.type !== "Polygon" || newGeometry.type !== "Polygon") {
          throw new Error("interpolateFeatures expects only Polygon geometry")
        }

        const shapeInterpolator = interpolate(currentGeometries[e].getOuterRing(), newGeometries[e].getOuterRing(), { string: false })
        geometryInterpolators.push({ type: "default", interpolator: shapeInterpolator })
      }
    } else if (currentGeometries.length === 1 && newGeometries.length > 1) {
      const separationInterpolator = separate(
        currentGeometries[0].getOuterRing(),
        newGeometries.map((geometry) => geometry.getOuterRing()),
        { string: false, single: true },
      )
      geometryInterpolators.push({ type: "separate", interpolator: separationInterpolator })
    } else if (currentGeometries.length > 1 && newGeometries.length === 1) {
      const combinationInterpolator = combine(
        currentGeometries.map((geometry) => geometry.getOuterRing()),
        newGeometries[0].getOuterRing(),
        { string: false, single: true },
      )
      geometryInterpolators.push({ type: "combine", interpolator: combinationInterpolator })
    } else {
      throw new Error(`Encountered an unexpected number of geometries: ${currentGeometries.length} and ${newGeometries.length}`)
    }

    featureInterpolators.push(geometryInterpolators)
  }

  return (t) => {
    if (t >= 1) {
      return newFeatures
    }

    const features = []
    for (let i = 0; i < featureInterpolators.length; i++) {
      const feature = newFeatures[i].clone()
      const geometries = []
      const geometryInterpolators = featureInterpolators[i]
      for (const [index, { type, interpolator }] of geometryInterpolators.entries()) {
        let geometry = feature.geometries[index].clone()
        let interpolated
        switch (type) {
          case "separate":
          case "combine":
            interpolated = interpolator(t)
            interpolated.forEach((d) => {
              const polygon = geometry.clone()
              polygon.setCoordinates([d])
              geometries.push(polygon)
            })
            break
          default:
            geometry.setOuterRing(interpolator(t))
            geometries.push(geometry)
            break
        }
      }
      feature.setGeometries(geometries)
      features.push(feature)
    }
    return features
  }
}
