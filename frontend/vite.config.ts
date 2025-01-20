import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // viteReact(),
    TanStackRouterVite(),

    svgr({
      svgrOptions: {
        exportType: "default",
        ref: false,
        svgo: false,
        icon: true,
        titleProp: false,
      },
      include: "**/icons/*.svg",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
