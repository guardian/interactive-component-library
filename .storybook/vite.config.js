import { defineConfig } from 'vitest/config'
import path from 'node:path'
import preact from '@preact/preset-vite'

const app = async () => {
  return defineConfig({
    resolve: {
      alias: {
        $particles: path.resolve(__dirname, '../src/lib/components/particles'),
        $molecules: path.resolve(__dirname, '../src/lib/components/molecules'),
        $shared: path.resolve(__dirname, '../src/lib/shared'),
        $styles: path.resolve(__dirname, '../src/lib/styles'),
      },
    },
    plugins: [preact()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/lib/styles/generated/mq.scss";',
        },
      },
      postcss: {
        plugins: [],
      },
    },
  })
}
// https://vitejs.dev/config/
export default app
