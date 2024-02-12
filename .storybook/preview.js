import '../src/lib/tailwind/theme.css'

const preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Particles', 'Molecules', 'Organisms'],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    viewport: {
      viewports: {
        mobilesmall: {
          name: 'Mobile small',
          styles: {
            width: '320px',
            height: '568px',
          },
        },
        mobile: {
          name: 'Mobile',
          styles: {
            width: '390px',
            height: '844px',
          },
        },
        mobileLandscape: {
          name: 'Mobile landscape',
          styles: {
            width: '480px',
            height: '320px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '740px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '980px',
            height: '680px',
          },
        },
        leftcol: {
          name: 'Left Column',
          styles: {
            width: '1140px',
            height: '680px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1300px',
            height: '680px',
          },
        },
      },
      defaultViewport: 'mobile',
      defaultOrientation: 'portrait',
    },
  },
}

export default preview
