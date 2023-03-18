import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {}
  },
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
})
