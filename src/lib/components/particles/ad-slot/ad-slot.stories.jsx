import { AdSlot } from '.'
import { useEffect, useState, useRef } from 'preact/hooks'
import { cloneElement } from 'preact'

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

  const adSlotRef = useRef(null)

  useEffect(() => {
    if (adSlotRef.current) {
      const slot = adSlotRef.current.base.children[0]

      const mobileSizes = slot.dataset.mobile
      const tabletSizes = slot.dataset.tablet
      const desktopSizes = slot.dataset.desktop

      const sizeMapping = {
        mobile: mobileSizes ? mobileSizes.split('|').map((size) => size.split(',').map(Number)) : undefined,
        tablet: tabletSizes ? tabletSizes.split('|').map((size) => size.split(',').map(Number)) : undefined,
        desktop: desktopSizes ? desktopSizes.split('|').map((size) => size.split(',').map(Number)) : undefined,
      }

      console.log(sizeMapping)

      const viewportWidth = window.innerWidth

      console.log(viewportWidth)

      if (viewportWidth >= 980 && sizeMapping.desktop?.length) {
        setSize(sizeMapping.desktop[0])
        console.log('desktop')
      } else if (viewportWidth >= 740 && sizeMapping.tablet?.length) {
        setSize(sizeMapping.tablet[0])
        console.log('tablet')
      } else if (sizeMapping.mobile?.length) {
        setSize(sizeMapping.mobile[0])
        console.log('mobile')
      }
    }
  }, [])

  return (
    <>
      <div style={{ width: size[0], height: size[1] }} className={styles.adSlotContainer}>
        {cloneElement(children, { ref: adSlotRef })}
      </div>
    </>
  )
}
