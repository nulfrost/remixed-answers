import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import Icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    Icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
});
