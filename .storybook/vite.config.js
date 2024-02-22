import { defineConfig } from 'vitest/config'
import tailwindcss from 'tailwindcss'
import path from 'node:path'
import preact from '@preact/preset-vite'

const app = async () => {
  return defineConfig({
    resolve: {
      alias: {
        $particles: path.resolve(__dirname, '../src/lib/components/particles'),
        $molecules: path.resolve(__dirname, '../src/lib/components/molecules'),
        $headless: path.resolve(__dirname, '../src/lib/components/headless'),
        $shared: path.resolve(__dirname, '../src/lib/shared'),
      },
    },
    plugins: [preact()],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  })
}
// https://vitejs.dev/config/
export default app
