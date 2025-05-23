import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['dotenv/config'],
    include: ['__tests__/**/*.test.ts'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})