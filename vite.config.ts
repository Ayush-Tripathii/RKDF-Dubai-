import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@content': path.resolve(__dirname, 'content'),
    },
  },
  build: { manifest: true, cssCodeSplit: false },
  ssr: { noExternal: ['react-router-dom', 'react-router', 'framer-motion'] },
});
