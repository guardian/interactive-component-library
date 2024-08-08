import { themes } from "@storybook/theming"
import "../src/lib/styles/main.scss"
import "./preview.scss"

/** @type {import('@storybook/theming').StorybookTheme} */
const themeDefaults = {
  brandTitle: "Guardian Visuals Component Library",
  brandTarget: "_self",
}

const preview = {
  parameters: {
    backgrounds: {
      // Background colours are disabled, because we only want
      // the grid functionality from @storybook/addon-backgrounds
      disable: true,
    },
    darkMode: {
      stylePreview: true,
      dark: {
        ...themes.dark,
        ...themeDefaults,
        brandImage: "logotype-white.svg",
        appBg: "black",
      },
      light: {
        ...themes.light,
        ...themeDefaults,
        appBg: "white",
        brandImage: "logotype-black.svg",
      },
      darkClass: ["dark-mode", "ios"],
    },
    options: {
      storySort: {
        order: ["Particles", "Molecules", "Organisms"],
      },
    },
    viewport: {
      viewports: {
        mobilesmall: {
          name: "Mobile small",
          styles: {
            width: "320px",
            height: "568px",
          },
        },
        mobile: {
          name: "Mobile",
          styles: {
            width: "390px",
            height: "844px",
          },
        },
        mobileLandscape: {
          name: "Mobile landscape",
          styles: {
            width: "480px",
            height: "320px",
          },
        },
        phablet: {
          name: "Phablet",
          styles: {
            width: "660px",
            height: "1024px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "740px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "980px",
            height: "680px",
          },
        },
        leftcol: {
          name: "Left Column",
          styles: {
            width: "1140px",
            height: "680px",
          },
        },
        wide: {
          name: "Wide",
          styles: {
            width: "1300px",
            height: "680px",
          },
        },
      },
      defaultViewport: "mobile",
      defaultOrientation: "portrait",
    },
  },
}

export default preview
