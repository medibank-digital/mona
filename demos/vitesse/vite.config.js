import { defineConfig } from 'vite';
import LitElementRefresh from '@dblechoc/plugin-lit-refresh';
import nodeResolve from '@rollup/plugin-node-resolve';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    LitElementRefresh(),
    process.env.NODE_ENV === 'production'
      ? nodeResolve()
      : nodeResolve({ exportConditions: ['development'] }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
