import {TickerItem} from '.'

export default {
    title: 'Molecules/TickerItem',
    component: TickerItem,
}

export const Default = {
    args: {
        firstParty: 'Labour',
        prevFirstParty: 'Conservatives',
        firstPartyAbbr: 'lab',
        prevFirstPartyAbbr: 'con',
        timeDeclaredStr: '3 mins ago',
        constituency: 'Burnley',
        prevPartyColor: '#0096FF',
        firstPartyColor: '#c70000'
    }
}