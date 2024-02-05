import { defineConfig } from 'vitest/config'
import tailwindcss from 'tailwindcss'
import { UserConfigExport } from 'vite'
import preact from '@preact/preset-vite'
import path from 'node:path'

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
    resolve: {
      alias: {
        '$atoms': path.resolve(__dirname, '../src/lib/components/atoms'),
        '$molecules': path.resolve(__dirname, '../src/lib/components/molecules'),
        '$headless': path.resolve(__dirname, '../src/lib/components/headless'),
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
