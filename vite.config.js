import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  build: {
    // Reduce chunk size
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries (~200KB)
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Other deps
          'axios': ['axios'],
          'motion': ['motion']
        }
      }
    }
  }
})