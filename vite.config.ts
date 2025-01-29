import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 4153,
    allowedHosts: ["https://github-candidate-search-wxzs.onrender.com"]
  }
});
