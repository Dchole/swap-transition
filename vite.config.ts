import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      outDir: "dist/",
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "SwapTransition",
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        globals: {}
      }
    }
  }
});
