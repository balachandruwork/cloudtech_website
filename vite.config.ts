import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'esnext',

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router/') ||
            id.includes('node_modules/react-router-dom/')) {
            return 'vendor'
          }

          if (id.includes('node_modules/framer-motion/')) {
            return 'motion'
          }

          if (
            id.includes('node_modules/react-hook-form/') ||
            id.includes('node_modules/zod/') ||
            id.includes('node_modules/@hookform/resolvers/')
          ) {
            return 'forms'
          }

          return undefined
        },
      },
    },
  },
})