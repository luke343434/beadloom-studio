import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/beadloom-studio/' : '/',
  server: {
    host: '127.0.0.1',
    allowedHosts: ['.lhr.life'],
  },
});
