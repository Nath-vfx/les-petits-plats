import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 6545,
    host: true, // Permet d'écouter sur toutes les interfaces
    hmr: false,
  },
});