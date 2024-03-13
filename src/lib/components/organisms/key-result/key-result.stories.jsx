import { KeyResult } from '.'
import { SlopeChart } from '$molecules/slope-chart'
import { RelativeTimeSentence } from '$particles/relative-time-sentence'
import { ControlChange } from '$molecules/control-change'
import storyStyle from './story.module.scss'

const meta = {
  title: 'Organisms/KeyResult',
  component: KeyResult,
}

export default meta

const slopeChartArgs = {
  id: 'slope-chart',
  domain: [0, 70],
  lines: [
    {
      y1: 30,
      y2: 10,
      abbreviation: 'snp',
    },
    {
      y1: 20,
      y2: 70,
      abbreviation: 'libdem',
    },
  ],
  y2Label: (d) => `${d.y2}%`,
  axis: {
    startLabel: '2019',
    endLabel: '2024',
  },
  padding: { left: 24, right: 36, top: 20, bottom: 20 },
  styles: storyStyle
}


export const UKElectionSeat = {
  args: {
    locator: <img src='src/lib/components/organisms/key-result/example.png' />,
    headerCopy: 'Jo Swinson lost her <strong>Dunbartonshire East</strong> seat to the resurgent SNP',
    bodyCopy: 'The nationalists took the constituency with a 149-vote majority, on a triumphant night which saw them take seats from all three other parties.',
    subHeader:
    <div style={{ display: 'flex'}}>
        <ControlChange previous={'libdem'} next={'snp'} text="SNP gain from Lib Dem" />
        <RelativeTimeSentence date={new Date('2019-12-13T23:00:00.000Z')} />
    </div>
    ,
    chart: <SlopeChart {...slopeChartArgs} />,
  },
  render: (args) => <KeyResult {...args} />,
}