import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Remove compression plugin
  ],
  server: {
    host: true, // This makes the server accessible on your network
    port: 5173, // Keep the default port (or change it if needed)
  },
});

// WITH COMPERSSION
// export default defineConfig({
//   plugins: [
//     react(),
//     compression({
//       algorithm: "gzip", // or 'brotliCompress' for Brotli
//       threshold: 10240, // Compress files larger than 10kB
//     }),
//   ],
//   // server: {
//   //   host: true, // This makes the server accessible on your network
//   //   port: 5173, // Keep the default port (or change it if needed)
//   // },
//   build: {
//     rollupOptions: {
//       onwarn(warning, warn) {
//         // Suppress specific warnings
//         if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
//         if (warning.code === "THIS_IS_UNDEFINED") return;
//         // Add more conditions if needed
//         warn(warning);
//       },
//       output: {
//         manualChunks(id) {
//           if (id.includes("node_modules")) {
//             return "vendor";
//           }
//         },
//       },
//     },
//   },
// });
