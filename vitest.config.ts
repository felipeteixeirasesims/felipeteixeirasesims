import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['vitest.setup'],
    reporters: ['default', 'html'],
    include: ['**/**/*.spec.ts'],
    coverage: {
      enabled: true,
      provider: 'istanbul'
    }
  }
})