import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "./config.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxying API requests
      "/proxied": {
        target: config.BACKEND_BASE_URL, // Backend server URL
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxied/, "")
      }
    }
  }
});
