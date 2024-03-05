import { Container } from '.'

const meta = {
  title: 'Particles/Container',
  component: Container,
  render: (args) => (
    <Container {...args}>
      <div style={{ backgroundColor: '#f6f6f6', height: 400 }} />
    </Container>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'reset',
    },
  },
}

export default meta

export const Default = {
  args: {
    sideBorders: true,
  },
}
