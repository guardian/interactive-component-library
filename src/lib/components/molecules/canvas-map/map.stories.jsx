/* eslint-disable react-hooks/exhaustive-deps */
import {
  Map,
  Projection,
  GeoJSON,
  Style,
  Fill,
  Stroke,
  TextLayer,
  Text,
} from "."
import { feature, merge } from "topojson-client"
import westminsterConstituenciesTopo from "./sample-data/uk-westminster-simplified.json"
import ukCitiesGeo from "./sample-data/uk-cities.json"
import { VectorLayer } from "./lib/layers/VectorLayer"
import { useMemo } from "preact/hooks"

const meta = {
  title: "Molecules/CanvasMap",
  component: Map,
  parameters: {
    viewport: {
      defaultViewport: "reset",
    },
  },
}

export default meta

export const Default = {
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
      westminsterConstituenciesTopo,
      westminsterConstituenciesTopo.objects["uk-westminster"].geometries,
    )

    const constituencies = feature(
      westminsterConstituenciesTopo,
      westminsterConstituenciesTopo.objects["uk-westminster"],
    )

    const outlineFeatures = useMemo(
      () => new GeoJSON().readFeaturesFromObject(outline),
      [],
    )
    const constituencyFeatures = useMemo(
      () => new GeoJSON().readFeaturesFromObject(constituencies),
      [],
    )
    const citiesFeatures = useMemo(
      () => new GeoJSON().readFeaturesFromObject(ukCitiesGeo),
      [],
    )

    const fillStyle = new Style({
      fill: new Fill({ color: "#f1f1f1" }),
    })
    const strokeStyle = new Style({
      stroke: new Stroke({ color: "#999", width: 1 }),
    })

    return (
      <div style={{ height: "80vh" }}>
        <Map {...args}>
          <VectorLayer.Component features={outlineFeatures} style={fillStyle} />
          <VectorLayer.Component
            features={constituencyFeatures}
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
      </div>
    )
  },
}
