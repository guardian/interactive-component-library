import { Map, Projection, GeoJSON, Style, Fill, Stroke } from "."
import { feature, merge } from "topojson-client"
import westminsterConstituenciesTopo from "./sample-data/uk-westminster-simplified.json"
import { VectorLayer } from "./lib/layers/VectorLayer"

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

    const fillStyle = new Style({
      fill: new Fill({ color: "#f1f1f1" }),
    })

    const strokeStyle = new Style({
      stroke: new Stroke({ color: "#999", width: 1 }),
    })

    const constituencies = feature(
      westminsterConstituenciesTopo,
      westminsterConstituenciesTopo.objects["uk-westminster"],
    )

    return (
      <div style={{ height: "80vh" }}>
        <Map {...args}>
          <VectorLayer.Component
            features={new GeoJSON().readFeaturesFromObject(outline)}
            style={fillStyle}
          />
          <VectorLayer.Component
            features={new GeoJSON().readFeaturesFromObject(constituencies)}
            style={(feature) => {
              if (feature.properties.name === "North East Hertfordshire") {
                return new Style({
                  fill: new Fill({ color: "#FF0000" }),
                })
              }
              return strokeStyle
            }}
          />
        </Map>
      </div>
    )
  },
}
