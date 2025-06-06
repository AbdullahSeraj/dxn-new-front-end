import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  externals: {
    // Use external version of React
    react: "React",
    "react-dom": "ReactDOM",
    "react-router": "ReactRouter",
  },
  server: {
    port: 3000,
  },
});
