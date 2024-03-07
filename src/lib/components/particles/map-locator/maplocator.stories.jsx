import { MapLocator } from '.'
import exampleTopojson from './example_topo.json'
import { feature } from 'topojson-client'
import proj4d3 from 'proj4d3'

const meta = {
  title: 'Particles/MapLocator',
  component: MapLocator,
}

const featureCollection = {
  type: 'FeatureCollection',
  features: feature(exampleTopojson, exampleTopojson.objects.ukmap).features
}

const width = 200
const height = 300

const proj4String = '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs'
const projection = proj4d3(proj4String).fitSize([width, height], featureCollection)

export default meta

export const Default = {
  args: {
    projection,
    size: { width, height },
    marker: { radius: 15, coordinates: [0.1276, 51.5072] },
    basemapImage: 'src/lib/components/particles/map-locator/example.svg',
    styles: { circle: 'fill-color--con' }
  },
  render: (args) => <MapLocator {...args} />
}