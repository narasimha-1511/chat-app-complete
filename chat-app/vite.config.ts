import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
console.log("Vite config loaded with proxy");

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(`Rewriting: ${path} to ${path.replace(/^\/api/, "")}`);
          return path.replace(/^\/api/, "");
        },
      },
    },
  },
});
