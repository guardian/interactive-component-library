const config = {
  core: {
    disableTelemetry: true,
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-controls",
    "@storybook/addon-links",
    "@storybook/addon-measure",
    "@storybook/addon-viewport",
    "@storybook/addon-docs",
    "@storybook/addon-actions",
    "@storybook/addon-interactions",
    "storybook-dark-mode",
    {
      name: "@storybook/addon-storysource",
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
  ],
  framework: {
    name: "@storybook/preact-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
    defaultName: "Documentation",
  },
}
export default config
