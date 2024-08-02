import { PartyProfile } from "."
import greenEFAImage from "./sample-images/green-efa.png"

export default {
  title: "Molecules/PartyProfile",
  component: PartyProfile,
}

export const Default = {
  args: {
    title: "Labour",
    subtitle: "Keir Starmer",
    blurb:
      "Labour is the traditional party of the centre-left in Great Britain.",
    styles: { title: "before-color--lab", img: "bg-color--lab" },
    imgSrc:
      "https://gdn-cdn.s3.amazonaws.com/2024/03/pix/stamer500GaryCaltonObs-removebg-preview.png",
    imgAltText: "A photo of Keir Starmer",
  },
  render: (args) => <PartyProfile {...args} />,
}

export const WithFootnote = {
  args: {
    title: "Greens/EFA",
    subtitle: "Group of the greens/European Free Alliance",
    subtitleStyle: "small",
    blurb: "This group is largely comprised of green and regionalist parties.",
    footnote:
      "Includes: German foreign minister Annalena Baerbock’s Alliance 90/The Greens",
    styles: { title: "before-color--greenefa", img: "bg-color--greenefa" },
    imgSrc: greenEFAImage,
  },
  render: (args) => <PartyProfile {...args} />,
}
