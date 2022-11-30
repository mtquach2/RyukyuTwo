import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    build: {
        emptyOutDir: true
    },
    plugins: [
        viteStaticCopy({
        targets: [
            {
            src: './static/*',
            dest: './static'
            }
        ]
        })
    ]
});