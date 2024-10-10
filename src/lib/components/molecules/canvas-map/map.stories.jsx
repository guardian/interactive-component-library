import {
  Map,
  Projection,
  GeoJSON,
  Style,
  Fill,
  Stroke,
  FeatureCollection,
  VectorLayer,
  TextLayer,
  Text,
  HashPattern,
} from "."
import { AspectRatioBox } from "$particles"
import { feature, merge } from "topojson-client"
import states10mTopo from "./sample-data/states-10m.json"
import statesElectoralCollegeCartogram from "./sample-data/ecv-cartogram.json"
import statesSenateCartogram from "./sample-data/senate-cartogram.json"
import statesHouseCartogram from "./sample-data/house-cartogram.json"
import statesGovernorsCartogram from "./sample-data/governors-cartogram.json"
import statesAlbers10mTopo from "./sample-data/states-albers-10m.json"
import westminsterConstituenciesTopo from "./sample-data/uk-westminster-simplified.json"
import usPresidentialResults from "./sample-data/us-presidential-results.json"
import ukCitiesGeo from "./sample-data/uk-cities.json"
import { useState, useCallback, useMemo } from "preact/hooks"
import { pointer } from "d3-selection"
import { fn } from "@storybook/test"

const meta = {
  title: "Molecules/Map",
  component: Map,
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: "Desktop",
          styles: {
            width: "980px",
            height: "668px",
          },
        },
      },
      defaultViewport: "desktop",
    },
    layout: "fullscreen",
    aspectRatio: 0.68,
  },
  decorators: [
    (Story, { parameters }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <div style={{ borderBottom: "1px solid #CCC" }}>
            <AspectRatioBox heightAsProportionOfWidth={parameters.aspectRatio}>
              <Story />
            </AspectRatioBox>
          </div>
        </div>
      )
    },
  ],
  args: {
    electionResultsByState: usPresidentialResults.reduce((results, current) => {
      const state = current.reportingUnits[0].stateName
      const winner = current.reportingUnits[0].candidates.find((c) => c.winner)
      return {
        ...results,
        [state]: {
          winner: {
            name: `${winner.first} ${winner.last}`,
            party: winner.party,
          },
        },
      }
    }, {}),
  },
}

export default meta

export const USMap = {
  args: {
    allowZoomPan: false,
    config: {
      debug: true,
      view: {
        extent: [
          [-171.79, 18.92],
          [-66.96, 71.36],
        ],
        projection: Projection.geoAlbersUS,
        minZoom: 1,
        maxZoom: 17,
        padding: { top: 20, right: 0, bottom: 20, left: 0 },
      },
    },
  },
  render: (args) => {
    const strokeStyle = new Style({
      stroke: new Stroke({
        color: "#999",
        width: 1,
      }),
    })
    // @ts-ignore
    const states = feature(states10mTopo, states10mTopo.objects["states"])
    const statesToFilter = ["Puerto Rico", "United States Virgin Islands"]
    // @ts-ignore
    const filteredStates = states.features.filter(
      (d) => !statesToFilter.includes(d.properties.name),
    )

    return (
      <Map.Component {...args}>
        <VectorLayer.Component
          features={new GeoJSON().readFeaturesFromObject(filteredStates)}
          style={strokeStyle}
        />
      </Map.Component>
    )
  },
}

export const USPreprojected = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
      },
    },
  },
  render: (args) => {
    const strokeStyle = new Style({
      stroke: new Stroke({
        color: "#999",
        width: 1,
      }),
    })

    const states = feature(
      // @ts-ignore
      statesAlbers10mTopo,
      statesAlbers10mTopo.objects["states"],
    )

    // @ts-ignore
    const featureCollection = FeatureCollection.fromGeoJSON(states)

    return (
      <Map.Component {...args}>
        <VectorLayer.Component
          features={featureCollection}
          style={strokeStyle}
        />
      </Map.Component>
    )
  },
}

export const USInteractiveMap = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
    onHighlight: fn(),
  },
  render: ({ config, onHighlight }) => {
    /** @type {[Map, function]} */
    const [map, setMap] = useState()
    const [highlightedFeature, setHiglightedFeature] = useState(null)
    const featureCollection = useMemo(() => {
      const states = feature(
        // @ts-ignore
        statesAlbers10mTopo,
        statesAlbers10mTopo.objects["states"],
      )

      // @ts-ignore
      const featureCollection = FeatureCollection.fromGeoJSON(states)
      return featureCollection
    }, [])

    const onMouseMove = useCallback(
      (event) => {
        if (!map) return

        // find feature under pointer
        const features = map.findFeatures(pointer(event))
        if (features.length > 0) {
          setHiglightedFeature(features[0])
          onHighlight(features[0].properties?.name)
        }
      },
      [map, onHighlight],
    )

    const onClick = useCallback(
      (event) => {
        if (!map) return

        const features = map.findFeatures(pointer(event))
        if (features.length > 0) {
          map.zoomToFeature(features[0])
        }
      },
      [map],
    )

    const styleFeatures = useCallback(
      (featureToStyle) => {
        const stroke = new Stroke({
          color: "#999",
          width: 1,
        })

        if (featureToStyle.uid === highlightedFeature?.uid) {
          return new Style({
            stroke,
            fill: new Fill({ color: "#ededed" }),
          })
        }

        return new Style({
          stroke,
        })
      },
      [highlightedFeature],
    )

    return (
      <div
        onMouseMove={onMouseMove}
        onClick={onClick}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <Map.Component config={config} onLoad={setMap}>
          <VectorLayer.Component
            features={featureCollection}
            style={styleFeatures}
          />
        </Map.Component>
      </div>
    )
  },
}

export const USChoropleth = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
      },
    },
  },
  render: ({ config, electionResultsByState }) => {
    const states = feature(
      // @ts-ignore
      statesAlbers10mTopo,
      statesAlbers10mTopo.objects["states"],
    )
    // @ts-ignore
    const featureCollection = FeatureCollection.fromGeoJSON(states)

    const pattern = new HashPattern({
      stripeColor: "#A8B4D2",
      gapColor: "#2f3192",
    })

    return (
      <Map.Component config={config}>
        <VectorLayer.Component
          features={featureCollection}
          style={(feature) => {
            if (feature.properties.name === "California") {
              return new Style({
                fill: new Fill({ pattern }),
              })
            }

            const result = electionResultsByState[feature.properties.name]
            return styleForResult(result)
          }}
        />
      </Map.Component>
    )
  },
}

export const USElectoralCartogram = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
      },
    },
  },
  render: (args) => {
    const strokeStyle = new Style({
      stroke: new Stroke({
        color: "#999",
        width: 1,
      }),
    })

    const cartogramFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesElectoralCollegeCartogram.features.filter(
        (d) => d.geometry.type === "Polygon",
      ),
    )
    const labelFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesElectoralCollegeCartogram.features.filter(
        (d) => d.geometry.type === "Point",
      ),
    )

    return (
      <Map.Component {...args}>
        <VectorLayer.Component
          features={cartogramFeatures}
          style={strokeStyle}
        />
        <TextLayer.Component
          features={labelFeatures}
          drawCollisionBoxes={false}
          style={(feature) => {
            return new Style({
              text: new Text({
                content: feature.properties.text,
                anchor: feature.properties.anchor,
                fontSize: "16px",
                radialOffset: 0.25,
              }),
            })
          }}
        />
      </Map.Component>
    )
  },
}

export const USSenateCartogram = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
  },
  render: (args) => {
    const states = feature(
      // @ts-ignore
      statesAlbers10mTopo,
      statesAlbers10mTopo.objects["states"],
    )

    // @ts-ignore
    const stateFeatures = FeatureCollection.fromGeoJSON(states)

    const cartogramFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesSenateCartogram.features.filter((d) =>
        ["Polygon", "LineString"].includes(d.geometry.type),
      ),
    )

    const labelFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesSenateCartogram.features.filter((d) => d.geometry.type === "Point"),
    )

    const strokeStyle = new Style({
      stroke: new Stroke({
        color: "#999",
        width: 1,
      }),
    })

    const textStyle = (feature) => {
      return new Style({
        text: new Text({
          content: feature.properties.text,
          anchor: feature.properties.anchor,
          fontSize: "16px",
          radialOffset: 0.25,
        }),
      })
    }

    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Map.Component {...args}>
          <VectorLayer.Component features={stateFeatures} style={strokeStyle} />
          <VectorLayer.Component
            features={cartogramFeatures}
            style={(feature) => {
              const strokeColor = feature.properties?.id.endsWith("01")
                ? "#FF0000"
                : "#2F3192"
              return new Style({
                fill: new Fill({ color: strokeColor, opacity: 0.2 }),
                stroke: new Stroke({
                  color: strokeColor,
                  width: 2,
                  position: "inside",
                }),
              })
            }}
          />
          <TextLayer.Component
            features={labelFeatures}
            drawCollisionBoxes={false}
            style={textStyle}
          />
        </Map.Component>
      </div>
    )
  },
}

export const USHouseCartogram = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
      },
    },
  },
  render: (args) => {
    const strokeStyle = new Style({
      stroke: new Stroke({
        color: "#999",
        width: 1,
      }),
    })

    const cartogramFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesHouseCartogram.features.filter(
        (d) => d.geometry.type === "Polygon",
      ),
    )
    const labelFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesHouseCartogram.features.filter((d) => d.geometry.type === "Point"),
    )

    return (
      <Map.Component {...args}>
        <VectorLayer.Component
          features={cartogramFeatures}
          style={strokeStyle}
        />
        <TextLayer.Component
          features={labelFeatures}
          drawCollisionBoxes={false}
          style={(feature) => {
            return new Style({
              text: new Text({
                content: feature.properties.text,
                anchor: feature.properties.anchor,
                fontSize: "16px",
                radialOffset: 0.25,
              }),
            })
          }}
        />
      </Map.Component>
    )
  },
}

export const USGovernorsCartogram = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [975, 610],
        ],
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    },
  },
  render: (args) => {
    const states = feature(
      // @ts-ignore
      statesAlbers10mTopo,
      statesAlbers10mTopo.objects["states"],
    )

    // @ts-ignore
    const stateFeatures = FeatureCollection.fromGeoJSON(states)

    const cartogramFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesGovernorsCartogram.features.filter((d) =>
        ["Polygon", "LineString"].includes(d.geometry.type),
      ),
    )

    const labelFeatures = FeatureCollection.fromGeoJSON(
      // @ts-ignore
      statesGovernorsCartogram.features.filter(
        (d) => d.geometry.type === "Point",
      ),
    )

    const strokeStyle = new Style({
      stroke: new Stroke({
        color: "#999",
        width: 1,
      }),
    })

    const textStyle = (feature) => {
      return new Style({
        text: new Text({
          content: feature.properties.text,
          anchor: feature.properties.anchor,
          fontSize: "16px",
          radialOffset: 0.25,
        }),
      })
    }

    return (
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        <Map.Component {...args}>
          <VectorLayer.Component features={stateFeatures} style={strokeStyle} />
          <VectorLayer.Component
            features={cartogramFeatures}
            style={(feature) => {
              const strokeColor =
                feature.properties?.id === "CO01" ? "#FF0000" : "#707070"
              return new Style({
                fill: new Fill({ color: strokeColor, opacity: 0.2 }),
                stroke: new Stroke({
                  color: strokeColor,
                  width: 2,
                  position: "inside",
                }),
              })
            }}
          />
          <TextLayer.Component
            features={labelFeatures}
            drawCollisionBoxes={false}
            style={textStyle}
          />
        </Map.Component>
      </div>
    )
  },
}

export const UKMap = {
  args: {
    config: {
      view: {
        projection: Projection.geoAlbersUKComposite,
        extent: [
          [-8.642194417322951, 49.88234469492934],
          [1.7683086664999994, 60.8456995072],
        ],
        minZoom: 1,
        maxZoom: 17,
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
      },
    },
  },
  render: (args) => {
    const outline = merge(
      // @ts-ignore
      westminsterConstituenciesTopo,
      westminsterConstituenciesTopo.objects["uk-westminster"].geometries,
    )

    const constituencies = feature(
      // @ts-ignore
      westminsterConstituenciesTopo,
      westminsterConstituenciesTopo.objects["uk-westminster"],
    )

    const outlineFeatures = new GeoJSON().readFeaturesFromObject(outline)
    const constituenciesFeatures = new GeoJSON().readFeaturesFromObject(
      constituencies,
    )

    const citiesFeatures = new GeoJSON().readFeaturesFromObject(ukCitiesGeo)

    const fillStyle = new Style({
      fill: new Fill({ color: "#f1f1f1" }),
    })

    const strokeStyle = new Style({
      stroke: new Stroke({ color: "#999", width: 1 }),
    })

    const dundeeStyle = (currentZoom) =>
      new Style({
        text: new Text({
          content: "Dundee",
          anchor: "left",
          callout: currentZoom < 4 && {
            offsetByPct: { x: 10, y: 10 },
            leaderGap: 2,
          },
          icon: {
            size: 10,
            padding: 2,
            style: new Style({
              fill: new Fill({ color: "#FF22E0" }),
            }),
          },
        }),
      })

    return (
      <Map.Component {...args}>
        <VectorLayer.Component features={outlineFeatures} style={fillStyle} />
        <VectorLayer.Component
          features={constituenciesFeatures}
          style={(feature) =>
            feature.properties.name === "North East Hertfordshire"
              ? new Style({ fill: new Fill({ color: "#FF0000" }) })
              : strokeStyle
          }
        />
        <TextLayer.Component
          features={citiesFeatures}
          declutter={false}
          style={(feature, currentZoom) => {
            if (feature.properties.name === "Dundee") {
              return dundeeStyle(currentZoom)
            } else {
              return new Style({
                text: new Text({
                  content: feature.properties.name,
                  radialOffset: 0,
                  anchor: "left",
                }),
              })
            }
          }}
        />
      </Map.Component>
    )
  },
}

function styleForResult(result) {
  const style = new Style({
    stroke: new Stroke({
      color: "#999",
      width: 1,
    }),
    fill: new Fill({
      color: "#d7d7d7",
    }),
  })
  if (!result) return style

  const fill = new Fill()
  const computedStyle = getComputedStyle(document.body)

  const winningParty = result.winner.party
  switch (winningParty) {
    case "Dem":
      fill.color = computedStyle.getPropertyValue("--dem")
      break
    case "GOP":
      fill.color = computedStyle.getPropertyValue("--gop")
      break
    default:
      fill.color = computedStyle.getPropertyValue("--oth")
  }

  style.fill = fill
  return style
}
