import { AdSlot } from '.'
import { useState } from 'preact/hooks'
import styles from './stories.module.scss'

const meta = {
  title: 'Particles/AdSlot',
  component: AdSlot,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  decorators: [
    (Story) => (
      <CommercialContainer>
        <Story />
      </CommercialContainer>
    ),
  ],
}

export default meta

export const MPU = {
  args: {
    name: 'mpu',
    sizeMapping: {
      mobile: [[300, 250]],
    },
  },
}

export const MPULeaderboardBillboard = {
  parameters: {
    viewport: {
      defaultViewport: 'wide',
    },
  },
  args: {
    name: 'mpu_leaderboard_billboard',
    sizeMapping: {
      mobile: [[300, 250]],
      tablet: [[728, 90]],
      desktop: [[970, 250]],
    },
  },
}

function CommercialContainer({ children }) {
  const [size, setSize] = useState([300, 250])

  document.addEventListener('gu.commercial.slot.fill', (event) => {
    const viewportWidth = window.innerWidth

    const sizeMapping = event.detail.additionalSizes

    if (viewportWidth > 980 && sizeMapping.desktop?.length) {
      setSize(sizeMapping.desktop[0])
    } else if (viewportWidth > 740 && sizeMapping.tablet?.length) {
      setSize(sizeMapping.tablet[0])
    } else if (sizeMapping.mobile?.length) {
      setSize(sizeMapping.mobile[0])
    }
  })

  return (
    <>
      <div style={{ width: size[0], height: size[1] }} className={styles.adSlotContainer}>
        {children}
      </div>
    </>
  )
}
