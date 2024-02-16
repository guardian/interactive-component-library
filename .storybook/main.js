import remarkGfm from 'remark-gfm'

const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-links',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-viewport',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
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
    options: {
      builder: {
        viteConfigPath: '.storybook/vite.config.js',
      },
    },
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
}
export default config
