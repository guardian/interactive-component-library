import path from 'node:path'
import { defineConfig } from 'vitest/config'
import tailwindcss from 'tailwindcss'
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
        $headless: path.resolve(__dirname, 'src/lib/components/headless'),
        $shared: path.resolve(__dirname, 'src/lib/shared'),
      },
    },
    plugins: [peerDepsExternal(), preact()],
    css: {
      postcss: {
        plugins: [tailwindcss],
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
            tailwindcss: 'tailwindcss',
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
