import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import Icons from "unplugin-icons/vite";
import TurboConsole from "vite-plugin-turbo-console";

export default defineConfig({
  plugins: [
    TurboConsole(),
    remix(),
    tsconfigPaths(),
    Icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
});
