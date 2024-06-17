import { PageSection, SectionLayout } from "."
import { Container } from "$particles"
import styles from "./stories.module.scss"

const meta = {
  title: "Molecules/PageSection",
  component: PageSection,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "reset",
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
    backgroundColor: "var(--tertiary-bg-color)",
    borderTop: true,
  },
}

export const SectionWithLongHeaderContent = {
  render: (args) => {
    return (
      <>
        <PageSection {...args}>
          {{
            header: (
              <div>
                <h2>Section one</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla, libero vel fermentum dapibus, neque eros interdum magna, at cursus enim justo nec elit. Orci varius natoque
                  penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas accumsan sem lacinia turpis ullamcorper, imperdiet dictum justo euismod. Quisque justo sem, porta non
                  dictum eget, pharetra a erat. Quisque sollicitudin aliquet sem, sed feugiat tortor luctus id. Maecenas tincidunt sapien sit amet urna varius finibus. Nunc finibus arcu ac elementum
                  gravida. Aenean blandit ut arcu eget ornare. Curabitur in malesuada ipsum, ut aliquet est.
                </p>
              </div>
            ),
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

export const FullWidth = {
  args: {
    layout: SectionLayout.fullWidth,
  },
}
