import { defineConfig } from 'vite';
import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'Sub',
    },
    emptyOutDir: false,
    rollupOptions: {
      external: [
        'lit',
        'lit-element',
        'lit-html',
        '@lit/reactive-element',
        'lit/decorators.js',
        'lit/html.js',
        'lit/static-html.js',
        'lit/directive.js',
        'twind',
      ],
      output: {
        globals: {
          lit: 'Lit',
          'lit/decorators.js': 'LitDecoratorsJs',
          twind: 'Twind',
        },
      },
    },
  },
  plugins: [
    process.env.NODE_ENV === 'production'
      ? nodeResolve()
      : nodeResolve({ exportConditions: ['development'] }),
  ],
});
