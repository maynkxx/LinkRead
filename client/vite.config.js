import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  // This is the new section to add for your /api routes
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Your backend server port
        secure: false,      // Set to false for http
        changeOrigin: true, // Recommended for proxies
      },
    },
  },
  // These are your existing plugins
  plugins: [react(), tailwindcss(), flowbiteReact()],
});