import {defineConfig} from 'vite-plugin-windicss';

// https://windicss.org/posts/attributify.html
export default defineConfig({
    attributify: {
        // prefix: ''
    },
    preflight: false,
    prefixer: false,
    extract: {
        // 忽略部分文件夹
        exclude: ['node_modules', '.git', 'dist', '.idea', '.vscode']
    },
    corePlugins: {
        // 禁用掉在小程序环境中不可能用到的 plugins
        container: false
    },
    alias: {},
    plugins: [],
    variants: {}
});
