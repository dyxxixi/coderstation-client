import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
  server: {
    proxy: {
      // '本地': 'http://localhost:7001', '外部': 'https://coderstation-api-dyxxixi.koyeb.app',
      '/res': {
        target: 'https://coderstation-api-dyxxixi.koyeb.app',
        changeOrigin: true
      },
      '/api': {
        target: 'https://coderstation-api-dyxxixi.koyeb.app',
        changeOrigin: true
      },
      '/static': {
        target: 'https://coderstation-api-dyxxixi.koyeb.app',
        changeOrigin: true
      }
    }
  }
})
