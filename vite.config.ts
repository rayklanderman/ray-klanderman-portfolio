import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    react(),
    // The service worker belongs to the browser build only, not the prerender (SSR) bundle.
    !isSsrBuild &&
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,ico}'],
          // Large badge artwork, video posters and stray local folders are not worth precaching.
          globIgnores: ['**/node_modules/**', 'badges/**', 'images/showcase/**'],
          skipWaiting: true,
          clientsClaim: true,
          cleanupOutdatedCaches: true,
          navigateFallbackDenylist: [/^\/api\//],
        },
        devOptions: {
          enabled: false,
        },
        // The manifest is a static file (public/manifest.webmanifest) linked from index.html
        manifest: false,
      }),
  ],
  // Absolute asset URLs: prerendered pages live in nested folders (e.g. /projects/<slug>/).
  base: '/',
  server: {
    port: 3000,
    open: true,
    hmr: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:color";
          @use "sass:math";
        `,
      },
    },
  },
  ssr: {
    // Bundle UI libraries into the prerender build so Node never imports their CSS directly.
    noExternal: ['react-toastify', 'react-icons'],
  },
  build: isSsrBuild
    ? { sourcemap: false }
    : {
        sourcemap: true,
        outDir: 'dist',
        rollupOptions: {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            },
          },
        },
      },
}))
