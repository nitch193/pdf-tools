import { defineConfig } from 'vite';

const base = process.env.PAGES_BASE || '/';

export default defineConfig({
    base,
    build: {
        chunkSizeWarningLimit: 1000, // Increase limit to 1000kB to silence warning for large PDF library
    },
});
