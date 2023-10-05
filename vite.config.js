import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
  server: {
    proxy: {
      // '本地': 'http://localhost:7001', '外部': 'https://coderstation-server-wfbgy.run.goorm.site',
      '/res': {
        target: 'http://localhost:7001',
        changeOrigin: true
      },
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true
      },
      '/static': {
        target: 'http://localhost:7001',
        changeOrigin: true
      }
    }
  }
})
