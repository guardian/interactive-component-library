import { defineConfig } from 'vitest/config'
import tailwindcss from 'tailwindcss'
import { UserConfigExport } from 'vite'
import preact from '@preact/preset-vite'

const app = async (): Promise<UserConfigExport> => {
  return defineConfig({
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
