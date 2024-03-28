import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

// tsconfigPaths allows absolute paths for imports without having to maintain a separate path config (uses the tsconfig file).
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})
