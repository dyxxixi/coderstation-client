import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), unocss()],
  server: {
    proxy: {
      // '/res': 'https://coderstation-server.vercel.app',
      '/res': {
        target: 'https://coderstation-server.vercel.app',
        changeOrigin: true
      },
      '/api': {
        target: 'https://coderstation-server.vercel.app',
        changeOrigin: true
      },
      '/static': {
        target: 'https://coderstation-server.vercel.app',
        changeOrigin: true
      }
    }
  }
})
