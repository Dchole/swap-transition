import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"), // Ensure this is the correct entry point
      name: "SwapTransition",
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: [], // Add any dependencies here
      output: {
        globals: {
          // Add globals here if needed
        }
      }
    }
  },
  plugins: [
    dts({
      outDir: "dist/",
      insertTypesEntry: true,
      exclude: ["src/main.ts"]
    })
  ]
});
