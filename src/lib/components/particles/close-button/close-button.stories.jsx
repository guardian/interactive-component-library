import { CloseButton } from "."

const meta = {
  title: "Particles/CloseButton",
  component: CloseButton,
  decorators: [
    (Story) => (
      <div style={{ width: 17, height: 17 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Default = {}

export const Borderless = {
  args: {
    border: false,
  },
}
