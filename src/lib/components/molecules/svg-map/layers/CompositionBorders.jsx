import { useContext } from "preact/hooks"
import { MapContext } from "../context/MapContext"
import defaultStyles from "./compositionBorders.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export function CompositionBorders({ styles }) {
  const context = useContext(MapContext)
  const { projection } = context

  styles = mergeStyles(defaultStyles, styles)

  return <path className={styles.path} d={projection.getCompositionBorders()} />
}
