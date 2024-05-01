import defaultStyles from './style.module.scss'
import { mergeStyles } from '$styles/helpers/mergeStyles'

/* 
NOTE: The fraction is the fraction of the maximum possible value 
whether positive or negative.
So if used for a party change scenario where the biggest party
change is -20ppt the maximum value is 20 and the fraction of a bar representing 10 
would be 0.5. 
So the visual area of the chart 
is implicitly 40
*/

export function ChangeBar({ fraction, positive, party, width, height, styles }) {
  let centre = parseFloat(width) / 2
  let barwidth = parseFloat(fraction) * (parseFloat(width) /2)
  let negleft = `${centre - barwidth}px`
  let posleft = `${centre}px`  
  let thisStyles = 
  ` height: ${height}; width: ${barwidth}px; ${positive ? `left: ${posleft}` : `left: ${negleft}`}`
  let thisColor = ` bg-color--${party}`

  let zeroStyles = ` height: ${height};`

  styles = mergeStyles({ ...defaultStyles }, styles)


  return <div className={styles.wrapper} style={`width: ${width}px`}>
    <div className={styles.bar.concat(thisColor)} style={thisStyles}></div>
    <div className={styles.zero} style={zeroStyles}></div>
    </div>
}
