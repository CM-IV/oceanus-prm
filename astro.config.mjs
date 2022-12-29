import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
    integrations: [preact()],
    output: 'server',
    adapter: node({
        mode: 'standalone'
    }),
    server: {
        port: 5080,
        host: "0.0.0.0",
    },
});
