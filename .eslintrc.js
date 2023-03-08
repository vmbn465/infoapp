// 参考：https://eslint.bootcss.com/docs/rules/
// 参考：https://blog.csdn.net/x550392236/article/details/89497202
// 参考：https://blog.csdn.net/brokenkay/article/details/111106266

module.exports = {
    root: true,
    env: {
        node: true, //允许运行在node环境下
        browser: true, //允许运行在浏览器环境下
        es2021: true, //允许运行es2021环境下语法
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser',
    },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['vue', '@typescript-eslint', 'prettier'],
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.ts', '.js', '.jsx', '.json'],
            },
        },
    },
    globals: {
        //可以定义全局中的变量的权限（只读，可读可写）
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
        uni: 'readonly',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-var': 'error', //要求使用 let 或 const 而不是 var
        'prettier/prettier': 'error',
        'vue/no-multiple-template-root': 'off',
        'no-mutating-props': 'off',
        'vue/no-v-html': 'off',
        camelcase: 'error', // 双峰驼命名格式
        // indent: ['error', 4], //代码缩进4个空格 (switch时与prettier发生冲突)
        eqeqeq: ['error', 'always', { null: 'ignore' }], //比较时强制使用 === 或者 !==,但对null作比较时可以不用全等
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true,
            },
        ], // @fixable 必须使用单引号，禁止使用双引号
        // 结尾必须有分号;
        semi: [
            'error',
            'always',
            {
                omitLastInOneLineBlock: true,
            },
        ], // 结尾必须有分号;
        'vue/script-setup-uses-vars': 'error',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'vue/custom-event-name-casing': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'space-before-function-paren': 'off',
        'vue/attributes-order': 'off',
        'vue/v-on-event-hyphenation': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/one-component-per-file': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/require-default-prop': 'off',
    },
};
