import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import eslintPlugin from 'vite-plugin-eslint';
import windicss from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.0:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/upload': {
        target: 'http://127.0.0.0:8000/upload',
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
      enableRpx: true,
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
});
