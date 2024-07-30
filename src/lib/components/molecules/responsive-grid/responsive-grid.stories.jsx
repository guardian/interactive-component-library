import { ResponsiveGrid } from "."
import styles from "./story.module.css"

const meta = {
  title: "Molecules/ResponsiveGrid",
  component: ResponsiveGrid,
  args: {
    children: [...Array(8).keys()].map((d) => (
      <div key={d} className={styles.gridItem}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Non curabitur
        gravida arcu ac tortor dignissim convallis aenean. Mauris ultrices eros
        in cursus turpis massa tincidunt dui. Sit amet luctus venenatis lectus
        magna fringilla urna porttitor rhoncus. Lectus proin nibh nisl
        condimentum id venenatis.
      </div>
    )),
  },
}

export default meta

export const Default = {}

export const Small = {
  args: {
    type: "small",
  },
}

export const Large = {
  args: {
    type: "large",
  },
}
