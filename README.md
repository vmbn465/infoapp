## 简介

uni-app Vue3 Vite2 TypeScript 基础框架

## 特性

- **最新技术栈**：使用 Vue3/Vite2 ,TypeScript 等前端前沿技术开发
- **Eslint/Prettier**: 规范代码格式,统一编码
- **路由拦截**: 基于uni.addInterceptor进行路由拦截
- **请求拦截**: 核心使用 [luch-request]("https://ext.dcloud.net.cn/plugin?id=392"),支持请求和响应拦截等
- **缓存加密**: 使用AES加密缓存,可设置区分在开发或生成环境中是否加密

## 预览


## 安装使用

- 安装依赖

```bash
pnpm install
```

- 运行

```bash
# 其他端请查看 webpage.json script
pnpm dev:h5
```

- 打包

```bash
# 其他端请查看 webpage.json script
pnpm build:h5
```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中