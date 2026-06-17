import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: mode === 'development' ? {
      // Proxy API requests to Cloudflare Pages Functions server (local dev only)
      '/api': {
        target: 'http://localhost:8789',
        changeOrigin: true,
      },
    } : undefined,
  },
}));
