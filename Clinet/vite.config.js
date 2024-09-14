import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "gzip", // or 'brotliCompress' for Brotli
      threshold: 10240, // Compress files larger than 10kB
    }),
  ],
  // server: {
  //   host: true, // This makes the server accessible on your network
  //   port: 5173, // Keep the default port (or change it if needed)
  // },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
