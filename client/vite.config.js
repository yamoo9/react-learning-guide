import { defineConfig, loadEnv } from 'vite';

const viteConfig = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.BASE_URL ?? '/',
    server: {
      host: 'localhost',
      port: env.DEV_SERVER_PORT ?? 3000,
      cors: true,
      proxy: {
        '/api': {
          target: env.SERVER_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, 'api/v1'),
        },
      },
    },
    define: {
      __RUN_MODE__: JSON.stringify(env.RUN_MODE),
    },
  };
});

export default viteConfig;
