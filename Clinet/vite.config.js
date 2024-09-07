import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This makes the server accessible on your network
    port: 5173, // Keep the default port (or change it if needed)
  },
});
