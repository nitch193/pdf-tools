import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 1000, // Increase limit to 1000kB to silence warning for large PDF library
    },
});
