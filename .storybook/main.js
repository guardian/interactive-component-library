import { withoutVitePlugins } from "@storybook/builder-vite"

/** @type {import('@storybook/preact-vite').StorybookConfig} */
const config = {
  core: {
    disableTelemetry: true,
  },
  stories: [
    "./Introduction.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["./assets"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
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
    defaultName: "Documentation",
  },
  viteFinal: async (config) => {
    return {
      ...config,
      // Make sure to bundle all of our peer dependencies for the Storybook build,
      // we need preact, d3-geo etc in the bundle!
      plugins: await withoutVitePlugins(config.plugins, ["peer-deps-external"]),
      // Vite needs to know what the 'root' path is for our site, which for out GitHub pages
      // deployment, is our repo name (in https://guardian.github.io/interactive-component-library)
      base: "/interactive-component-library/",
    }
  },
}
export default config
