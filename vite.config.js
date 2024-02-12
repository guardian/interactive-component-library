import path from 'node:path'
import { defineConfig } from 'vitest/config'
import tailwindcss from 'tailwindcss'
import { name } from './package.json'
import preact from '@preact/preset-vite'

const app = async () => {
  /**
   * Removes everything before the last
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
      },
    },
    plugins: [preact()],
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
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.js'),
        name: formattedName,
        formats: ['es', 'umd'],
        fileName: (format) => `${formattedName}.${format}.js`,
      },
      rollupOptions: {
        external: ['preact', 'preact/hooks', 'tailwindcss'],
        output: {
          globals: {
            preact: 'preact',
            'preact/hooks': 'preactHooks',
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
