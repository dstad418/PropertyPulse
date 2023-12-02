import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase the chunk size warning limit
    chunkSizeWarningLimit: 1000, // for example, set to 5000 KB
  },
})
