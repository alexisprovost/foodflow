import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: command === 'build' ? '/dev/app/' : '/',
  publicDir: command === 'build' ? false : 'src/assets',

  plugins: [react()],
})
