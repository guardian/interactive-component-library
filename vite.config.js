import path from 'node:path'
import { defineConfig } from 'vitest/config'
import { name } from './package.json'
import preact from '@preact/preset-vite'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const app = async () => {
  /**
   * Removes everything before the last path segment
   * @octocat/library-repo -> library-repo
   * vite-component-library-template -> vite-component-library-template
   */
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name

  return defineConfig({
    resolve: {
      alias: {
        $particles: path.resolve(__dirname, 'src/lib/components/particles'),
        $molecules: path.resolve(__dirname, 'src/lib/components/molecules'),
        $shared: path.resolve(__dirname, 'src/lib/shared'),
        $styles: path.resolve(__dirname, 'src/lib/styles'),
      },
    },
    plugins: [peerDepsExternal(), preact({ prefreshEnabled: false })],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:map"; @import "./src/lib/styles/generated/mq.scss";',
        },
      },
      postcss: {
        plugins: [],
      },
    },
    esbuild: {
      jsx: 'automatic',
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    build: {
      sourcemap: true,
      minify: false,
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.js'),
        name: formattedName,
      },
      rollupOptions: {
        output: {
          globals: {
            'preact/jsx-runtime': 'preact/jsx-runtime',
            'preact/hooks': 'preact/hooks',
            'preact/compat': 'preact/compat',
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  })
}
// https://vitejs.dev/config/
export default app
