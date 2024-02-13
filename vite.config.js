import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // root: "./", // the root directory (where index.html is located)
    // base: "./", // the base of the paths in output directory (what paths in the dist directory are gonna begin with)
    // build: {
    //   outDir: "./dist", // the output directory (dist folder) (it's also the path from index.html to the dist folder)
    // },
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        "@": new URL("src/", import.meta.url).pathname,
        components: "/src/components",
        pages: "/src/pages",
        constants: "/src/constants",
        icons: "/src/assets/icons",
        images: "/src/assets/images",
      },
    },
  };
});
