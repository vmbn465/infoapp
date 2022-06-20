import { ConfigEnv, UserConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
// import eslintPlugin from 'vite-plugin-eslint';
import windicss from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';
import { resolve } from 'path';
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return {
    base: './',
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 发布时删除 console
          // drop_console: true,
        },
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_PROXY_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/upload': {
          target: env.VITE_PROXY_UPLOAD_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/upload/, ''),
        },
      },
    },
    plugins: [
      uni(),
      windicss(),
      MiniProgramTailwind({
        // 是否开启自动转换至 rpx 单位值的功能
        enableRpx: false,
        // 设计稿的像素宽度值，该尺寸会影响 rpx 转换过程中的计算比率
        designWidth: 350,
      }),
      // eslintPlugin({
      //   include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'],
      //   exclude: ['./node_modules/**'],
      //   cache: false,
      // }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
  };
};
