import { AspectRatioBox } from "."

const meta = {
  title: "Particles/AspectRatioBox",
  component: AspectRatioBox,
  render: (args) => {
    return (
      <AspectRatioBox {...args}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#f6f6f6",
            border: "1px solid #CCC",
          }}
        >
          {args.children}
        </div>
      </AspectRatioBox>
    )
  },
}

export default meta

export const Default = {
  args: {
    heightAsProportionOfWidth: 0.5,
    children: (
      <div style={{ padding: "1rem" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        porttitor imperdiet massa, at auctor metus scelerisque eu. Pellentesque
        vitae risus vel nisi malesuada convallis quis quis eros. Ut feugiat
        lectus eu nibh dignissim, vel mollis enim ullamcorper. Integer consequat
        sodales erat, at imperdiet mauris dictum ut. Pellentesque tristique,
        felis nec hendrerit vehicula, urna mi cursus nulla, quis consequat eros
        ante non mi. Integer maximus erat id mattis bibendum. Donec at aliquet
        ex. Etiam pharetra augue non nulla semper efficitur. Phasellus euismod
        metus id imperdiet sagittis. Morbi ullamcorper et nulla a dictum.
        Aliquam erat volutpat. Pellentesque ultricies ex at nisl fermentum
        placerat. Sed ut dui a felis mattis pellentesque.
      </div>
    ),
  },
}
