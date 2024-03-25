import defaultStyles from "./style.module.scss"
import { mergeStyles } from "$styles/helpers/mergeStyles"

export const SquareCutCornerIcon = ({cornerColor, squareColor, cornerPartyAbbreviation, squarePartyAbbreviation, styles}) => {

  styles = mergeStyles({...defaultStyles}, styles)

    return (
        <svg width="24" height="24" viewBox="0 0 24 24" >

            <g id="square-cutoff-corner-icon">

              <path id="square" fill={squareColor} className={`fill-color--${squarePartyAbbreviation}`} d="M1 1h23v23H1z" />

                <g id="corner">

                  {/* black and white colours here are to do with mask and are not displayed */}
                  <mask id="cornerMask" maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="15" fill="black">
                    <path fill="white" d="M0 0h15v15H0z" />
                    <path d="M11.952 1H1v10.952L11.952 1Z" />
                  </mask>
                  
                  <path id="cornerTriangle" fill={cornerColor} className={`fill-color--${cornerPartyAbbreviation}`} d="M11.952 1H1v10.952L11.952 1Z" />

                  <path className={styles.strokePrimaryBgColor} id="cornerLine" stroke-width="2" mask="url(#cornerMask)" d="M11.952 1H1v10.952L11.952 1Z"   />

                </g>
            </g>
        </svg>
    )
}