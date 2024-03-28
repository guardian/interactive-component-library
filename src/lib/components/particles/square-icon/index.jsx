import defaultStyles from "./style.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const SquareIcon = ({color, size, styles}) => {

  styles = mergeStyles({...defaultStyles}, styles)

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} >
            <rect id="square" fill={color} className={styles.squareFill} width={size} height={size} />
        </svg>
    )
}