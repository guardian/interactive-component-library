import { PageSection } from '.'
import { Container } from '$particles'
import styles from './stories.module.scss'

const meta = {
  title: 'Molecules/PageSection',
  component: PageSection,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'reset',
    },
  },
  render: (args) => {
    return (
      <PageSection {...args}>
        {{
          header: <h2>Section name</h2>,
          content: <p className={styles.content}>Section content</p>,
        }}
      </PageSection>
    )
  },
  decorators: [
    (Story) => (
      <Container sideBorders={true} styles={{ pageContainer: styles.pageContainer }}>
        <div className={styles.grid}>
          <div className={styles.border} />
          <div className={styles.body}>
            <Story />
          </div>
        </div>
      </Container>
    ),
  ],
}

export default meta

export const SingleSection = {}

export const TwoSections = {
  render: (args) => {
    return (
      <>
        <PageSection {...args}>
          {{
            header: <h2>Section one</h2>,
            content: <p className={styles.content}>Section content</p>,
          }}
        </PageSection>
        <PageSection borderTop={true}>
          {{
            header: <h2>Section two</h2>,
            content: <p className={styles.content}>Section content</p>,
          }}
        </PageSection>
      </>
    )
  },
}

export const BackgroundColor = {
  args: {
    backgroundColor: 'var(--tertiary-bg-color)',
    borderTop: true,
  },
}
