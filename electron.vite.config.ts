import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    main: {
      plugins: [externalizeDepsPlugin()],
      build: {
        outDir: 'dist/main',
        rollupOptions: {
          input: resolve(__dirname, 'src-electron/main/index.ts')
        }
      }
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      build: {
        outDir: 'dist/preload',
        rollupOptions: {
          input: resolve(__dirname, 'src-electron/preload/index.ts')
        }
      }
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src')
        }
      },
      plugins: [react()],
      build: {
        outDir: 'dist/renderer',
        rollupOptions: {
          input: resolve(__dirname, 'src/index.html')
        }
      },
      root: resolve(__dirname, 'src'),
      server: {
        port: process.env.VITE_DEV_SERVER_PORT ? parseInt(process.env.VITE_DEV_SERVER_PORT) : 7777,
      }
    }
  })
}
