import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
