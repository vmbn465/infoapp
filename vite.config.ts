import {defineConfig} from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import windicss from 'vite-plugin-windicss';
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
        windicss(),
        MiniProgramTailwind({
            // 是否开启自动转换至 rpx 单位值的功能
            enableRpx: true,
            // 	设计稿的像素宽度值，该尺寸会影响 rpx 转换过程中的计算比率
            designWidth: 350
        }),
    ],
});
