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
import { feature, merge } from "topojson-client"
import { AspectRatioBox } from "$particles/aspect-ratio-box"
import states10mTopo from "./sample-data/states-10m.json"
import statesElectoralCollegeCartogram from "./sample-data/2024-ecv-hex-cartogram.json"
import statesAlbers10mTopo from "./sample-data/states-albers-10m.json"
import westminsterConstituenciesTopo from "./sample-data/uk-westminster-simplified.json"
import ukCitiesGeo from "./sample-data/uk-cities.json"

const meta = {
  title: "Molecules/CanvasMap",
  component: Map,
  parameters: {
    viewport: {
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
            height: "100vh",
          }}
        >
          <div style={{ border: "1px solid #CCC", margin: "0 1rem" }}>
            <AspectRatioBox heightAsProportionOfWidth={parameters.aspectRatio}>
              <Story />
            </AspectRatioBox>
          </div>
        </div>
      )
    },
  ],
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

export const USElectoralCartogram = {
  args: {
    config: {
      view: {
        extent: [
          [0, 0],
          [637, 610],
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

    return (
      <Map {...args}>
        <VectorLayer.Component
          features={new GeoJSON().readFeaturesFromObject(
            statesElectoralCollegeCartogram,
          )}
          style={strokeStyle}
        />
      </Map>
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
