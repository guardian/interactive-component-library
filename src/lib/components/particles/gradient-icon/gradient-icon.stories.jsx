import { GradientIcon } from "."
import styles from "./story.module.css"

export default {
  title: "Particles/GradientIcon",
  component: GradientIcon,
}

export const Default = {
  args: {
    previous: "lab",
    next: "con",
  },
  render: (args) => <GradientIcon {...args} />,
}

export const UsingCustomStyles = {
  args: {
    styles: styles,
  },
  render: (args) => <GradientIcon {...args} />,
}

export const UsingCustomPartyClasses = {
  args: {
    styles: {
      previous: "stop-color--lab",
      next: "stop-color--con",
    },
  },
  render: (args) => <GradientIcon {...args} />,
}

export const MultipleIcons = {
  args: {
    items: [
      { previous: "lab", next: "con" },
      { previous: "con", next: "lab" },
      { previous: "ukip", next: "libdem" },
      { previous: "noc", next: "ind" },
    ],
  },
  render: (args) => {
    return (
      <div className={styles.stack}>
        {args.items.map((d, i) => (
          <GradientIcon key={i} {...d} />
        ))}
      </div>
    )
  },
}
