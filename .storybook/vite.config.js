import { defineConfig } from 'vitest/config'
import path from 'node:path'
import preact from '@preact/preset-vite'

const app = async () => {
  return defineConfig({
    resolve: {
      alias: {
        $particles: path.resolve(__dirname, '../src/lib/components/particles'),
        $molecules: path.resolve(__dirname, '../src/lib/components/molecules'),
        $headless: path.resolve(__dirname, '../src/lib/components/headless'),
        $styles: path.resolve(__dirname, '../src/lib/styles'),
      },
    },
    plugins: [preact()],
    css: {
      postcss: {
        plugins: [],
      },
    },
  })
}
// https://vitejs.dev/config/
export default app
