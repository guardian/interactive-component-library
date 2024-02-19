import { MapLocator } from '.'
import ukmap from './ukmap.json'
import { feature } from 'topojson-client'

const meta = {
  title: 'Particles/MapLocator',
  component: MapLocator,
}

const featureCollection = {
  type: 'FeatureCollection',
  features: feature(ukmap, ukmap.objects.ukmap).features
}

export default meta

export const Default = {
  args: {
    proj4String: '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs',
    featureCollection,
    markerCoordinates: [0.1276, 51.5072],
    width: 200,
    height: 300,
    markerColor: '#c70000',
    backgroundColor: '#707070'
  },
  render: (args) => <MapLocator {...args} />
}