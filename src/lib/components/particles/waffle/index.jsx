import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"


const getItemRotate = (fromBottom, fromLeft) => {
  if(fromBottom && fromLeft) {
    return 'waffleRotateItems270'
  } 
  else if(fromBottom && !fromLeft) {
    return 'waffleRotateItems180'
  }
  else if(!fromBottom && !fromLeft) {
    return 'waffleRotateItems90' 
  }
  else if(!fromBottom && fromLeft){
    return 'waffleRotateItems0'  // the css default
  }

}

// nb: using this trick: https://css-tricks.com/snippets/css/flip-an-image/

const getContainerFlip = (fromBottom, fromLeft) => {
  let scaleX = fromLeft ? 1 : -1 ;
  let scaleY = fromBottom ? -1 : 1 ;
  return `scale(${scaleX}, ${scaleY})`
}




export const Waffle = ({ fromLeft, fromBottom, containerWidth, itemWidth, children, styles }) => {


  // CSS  attributes driven by args
  let containerFlip = getContainerFlip(fromBottom, fromLeft);
  let itemRotateClass = getItemRotate(fromBottom, fromLeft);

  let gridStyles = {
    width: containerWidth, 
    transform: containerFlip,
    gridTemplateColumns: `repeat(auto-fill, ${itemWidth}px)`,
  }

  
  styles = mergeStyles(defaultStyles, styles)


  return (
      <div style={gridStyles} className={`${styles.waffleContainer} ${styles[itemRotateClass]}`}>
        {children}
      </div>
  )
}
