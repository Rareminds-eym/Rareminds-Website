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
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-swiper': ['swiper'],
        },
      },
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
