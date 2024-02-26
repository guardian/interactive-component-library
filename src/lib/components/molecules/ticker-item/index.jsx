import { GradientIcon } from "$particles/gradient-icon/index"
import { CircleIcon } from "$particles/circle-icon/index"


export const TickerItem = ({
    firstParty, 
    prevFirstParty, 
    firstPartyAbbr,
    prevFirstPartyAbbr,
    timeDeclaredStr,
    constituency,
    prevPartyColor,
    firstPartyColor
    }) => {

    let hasChanged = firstPartyAbbr !== prevFirstPartyAbbr;

    return (
        <div className="ticker-item" style="max-width:200px; font-size: 14px;">
            <div className="ticker-item--header" style="font-weight:700">
                { hasChanged ? 
                (
                    <p><GradientIcon previousStopColor={prevPartyColor} nextStopColor={firstPartyColor} /> {firstParty} gain from {prevFirstParty}</p>
                ) 
                :
                (
                    <p><CircleIcon color={firstPartyColor} /> {firstParty} hold</p>
                )
                }
                
            </div>
            <div className="ticker-item--body">
                <p>
                    {constituency}
                    <span className="timestamp" style="color:#999999;"> 
                     &nbsp;{timeDeclaredStr}
                    </span>
                </p>
            </div>
        </div>
    )
}