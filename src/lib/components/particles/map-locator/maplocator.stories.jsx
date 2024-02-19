import { MapLocator } from '.'
import ukmap from './ukmap.json'
import { feature } from 'topojson-client'
import proj4d3 from 'proj4d3'
import { geoPath } from 'd3-geo'

const meta = {
  title: 'Particles/MapLocator',
  component: MapLocator,
}

const featureCollection = {
  type: 'FeatureCollection',
  features: feature(ukmap, ukmap.objects.ukmap).features
}
const width = 200
const height = 300
const proj4String = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs'

const proj = proj4d3(proj4String).fitSize([width, height], featureCollection)
const path = geoPath().projection(proj)

export default meta

export const Default = {
  args: {
    projection: proj,
    path,
    width,
    height,
    features: featureCollection.features,
    markerCoordinates: [0.1276, 51.5072],
    markerColor: '#c70000',
    markerRadius: 15,
    backgroundColor: '#707070'
  },
  render: (args) => <MapLocator {...args} />
}