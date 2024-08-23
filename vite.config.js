import path from "node:path"
import { defineConfig } from "vitest/config"
import preact from "@preact/preset-vite"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import tsconfigPaths from "vite-tsconfig-paths"
import dts from "vite-plugin-dts"

const trimSrcLibDirFromPath = (path) => path.replace(/^(src\/)?lib\//, "")

export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === "lib"

  /** @type {import('vitest/config').UserConfig} */
  return {
    plugins: [
      peerDepsExternal(),
      tsconfigPaths(),
      preact({ prefreshEnabled: false }),

      isLibraryMode &&
        dts({
          tsconfigPath: "./jsconfig.lib.json",
          beforeWriteFile: (filePath, content) => ({
            filePath: trimSrcLibDirFromPath(filePath),
            content,
          }),
        }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "sass:map"; @import "./src/lib/styles/generated/mq.scss"; @import "./src/lib/styles/foundation/viewportHeight.scss";',
        },
      },
      postcss: {
        plugins: [],
      },
    },
    esbuild: {
      jsx: "automatic",
      jsxFactory: "h",
      jsxFragment: "Fragment",
    },
    build: {
      minify: false,
      lib: {
        formats: ["es"],
        entry: path.resolve(__dirname, "src/lib/index.js"),
        // Move files from /src/lib to /dist
        fileName: (format, name) => `${trimSrcLibDirFromPath(name)}.js`,
      },
      rollupOptions: {
        output: {
          // Preserve source directory structure in dist
          preserveModules: true,
          globals: {
            preact: "preact",
            "preact/jsx-runtime": "preact/jsx-runtime",
            "preact/hooks": "preact/hooks",
            "preact/compat": "preact/compat",
            "preact-transitioning": "preact-transitioning",
            "d3-scale": "d3-scale",
            "d3-geo": "d3-geo",
            "d3-zoom": "d3-zoom",
            "d3-selection": "d3-selection",
          },
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
  }
})
