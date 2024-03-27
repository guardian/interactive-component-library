import { useContext } from 'preact/hooks'
import { MapContext } from '../context/MapContext'

export function Prerendered({ url }) {
  const context = useContext(MapContext)
  const { width, height } = context.contentSize

  return <image width={width} height={height} href={url} />
}
