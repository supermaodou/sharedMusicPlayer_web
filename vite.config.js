import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:8088',
    //     changeOrigin: true
    //   }
    // }
  }

  // server: {
  //   proxy: {
  //     '/music': {
  //       target: 'http://localhost:8088',
  //       changeOrigin: true
  //     },
  //     '/queue': {
  //       target: 'http://localhost:8088',
  //       changeOrigin: true
  //     },
  //     '/user': {
  //       target: 'http://localhost:8088',
  //       changeOrigin: true
  //     }
  //   }
  // }
})
