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
      <Map {...args}>
        <VectorLayer.Component
          features={new GeoJSON().readFeaturesFromObject(filteredStates)}
          style={strokeStyle}
        />
      </Map>
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
      <Map {...args}>
        <VectorLayer.Component
          features={featureCollection}
          style={strokeStyle}
        />
      </Map>
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

    return (
      <Map config={config}>
        <VectorLayer.Component
          features={featureCollection}
          style={(feature) => {
            const result = electionResultsByState[feature.properties.name]
            return styleForResult(result)
          }}
        />
      </Map>
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
      <Map {...args}>
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
      </Map>
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
        <Map {...args}>
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
        </Map>
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
      <Map {...args}>
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
      </Map>
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
        <Map {...args}>
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
        </Map>
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

    return (
      <Map {...args}>
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
          style={(feature) =>
            new Style({
              text: new Text({ content: feature.properties.name }),
            })
          }
        />
      </Map>
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
