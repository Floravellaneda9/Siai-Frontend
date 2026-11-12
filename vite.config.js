import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor'
          }
          if (id.includes('bootstrap')) {
            return 'bootstrap'
          }
          if (id.includes('leaflet') || id.includes('react-leaflet')) {
            return 'maps'
          }
          if (id.includes('@supabase')) {
            return 'supabase'
          }
          if (id.includes('sweetalert2') || id.includes('axios')) {
            return 'ui'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})