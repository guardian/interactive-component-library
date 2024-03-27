import defaultStyles from "./style.module.css"
import { mergeStyles } from "$styles/helpers/mergeStyles"


const getItemRotate = (fromBottom, fromLeft) => {
  if(fromBottom && fromLeft) {
    return 'stackedGridRotateItems270'
  } 
  else if(fromBottom && !fromLeft) {
    return 'stackedGridRotateItems180'
  }
  else if(!fromBottom && !fromLeft) {
    return 'stackedGridRotateItems90' 
  }
  else if(!fromBottom && fromLeft){
    return 'stackedGridRotateItems0'  // the css default
  }
}

// nb: using this trick: https://css-tricks.com/snippets/css/flip-an-image/
// this works better than changing flex direction because it allows for an X and Y change

const getContainerFlip = (fromBottom, fromLeft) => {
  let scaleX = fromLeft ? 1 : -1 ;
  let scaleY = fromBottom ? -1 : 1 ;
  return `scale(${scaleX}, ${scaleY})`
}


export const StackedGrid = ({ fromLeft, fromBottom, containerWidth, children, styles }) => {


  // CSS  attributes driven by args
  let containerFlip = getContainerFlip(fromBottom, fromLeft);
  let itemRotateClass = getItemRotate(fromBottom, fromLeft);


  let flexStyles = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: containerWidth, 
    transform: containerFlip,
  }

  styles = mergeStyles(defaultStyles, styles)


  return (
      <div style={flexStyles} className={`${styles.stackedGridContainer} ${styles[itemRotateClass]}`}>
        {children}
      </div>
  )
}
