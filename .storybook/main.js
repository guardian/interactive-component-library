
const config = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-viewport',
    '@storybook/addon-docs',
    {
      name: '@storybook/addon-storysource',
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  framework: {
    name: '@storybook/preact-vite',
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
}
export default config
