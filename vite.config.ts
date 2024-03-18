import {vitePlugin as remix} from "@remix-run/dev"
import {defineConfig} from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import {nodePolyfills} from 'vite-plugin-node-polyfills'

export default defineConfig({
    plugins: [
        remix({
            ssr: false,
            ignoredRouteFiles: ["**/*.css"]
        }),
        tsconfigPaths(),
        nodePolyfills(),
    ],
    server: {
        fs: {
            // Restrict files that could be served by Vite's dev server.  Accessing
            // files outside this directory list that aren't imported from an allowed
            // file will result in a 403.  Both directories and files can be provided.
            // If you're comfortable with Vite's dev server making any file within the
            // project root available, you can remove this option.  See more:
            // https://vitejs.dev/config/server-options.html#server-fs-allow
            allow: [
                "app",
                "node_modules/@fontsource-variable/manrope",
            ]
        }
    }
})
