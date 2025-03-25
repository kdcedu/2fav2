import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/2fav2/',
  server: {
    port: 3001,
    host: true,
    strictPort: true
  },
  preview: {
    port: 3001
  }
})