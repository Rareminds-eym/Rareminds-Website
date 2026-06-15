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
        target: 'http://localhost:8788',
        changeOrigin: true,
      },
      // Proxy payment worker requests to avoid CORS issues (local dev only)
      // Routes /payments/* to http://localhost:9003/*
      // Example: /payments/create-order -> http://localhost:9003/create-order
      '/payments': {
        target: 'http://localhost:9003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payments/, ''),
      },
    } : undefined,
  },
}));
