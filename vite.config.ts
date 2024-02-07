import path from 'node:path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import { UserConfigExport } from 'vite'
import { name } from './package.json'
import preact from '@preact/preset-vite'

const app = async (): Promise<UserConfigExport> => {
  /**
   * Removes everything before the last
   * @octocat/library-repo -> library-repo
   * vite-component-library-template -> vite-component-library-template
   */
  const formattedName = name.match(/[^/]+$/)?.[0] ?? name

  return defineConfig({
    resolve: {
      alias: {
        $atoms: path.resolve(__dirname, 'src/lib/components/atoms'),
        $molecules: path.resolve(__dirname, 'src/lib/components/molecules'),
        $headless: path.resolve(__dirname, 'src/lib/components/headless'),
      },
    },
    plugins: [
      preact(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.js'),
        name: formattedName,
        formats: ['es', 'umd'],
        fileName: (format) => `${formattedName}.${format}.js`,
      },
      rollupOptions: {
        external: ['preact', 'tailwindcss'],
        output: {
          globals: {
            preact: 'preact',
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
