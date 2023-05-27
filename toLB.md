## 可能需要知道的

### 文件

代码在 src 下，pages为页面，其中吃什么和我的分别在 food 和 about 中

消息、我的帖子、关于我们 分别在 myMessageList、myDynamicList、aboutUs

（有时间这三个也弄弄，关于我们这个不弄的话大致页面要有，不然真不会布局，页面跳转也写下）

（当然你也可以看看其他页面的布局，随你喜欢了改）

页面配置文件在 pages.json 中

全局css文件在 uni.scss 中

### 代码

仅需负责页面排版 

页面跳转参考 app.vue 文件，该写法为vue3新写法，传统写法

```
import { useRouter } from "uni-mini-router";

useRouter().push({ path: "pages/addDynamic/index" })
// uni.navigate也行，具体看官网
```

组件使用了 uni-ui 和 uview-plus

使用 \<view> 代替 \<div>

### 启动

直接导入 Hbuilderx 应该就能启动吧（可能吧）

启动项目在 Hbuilderx 中选运行到 chrome ，微信开发者工具有 h5 开发的选项，打开后url直接输入就行

ps：后端提前部署了，如果慢可能是网络问题






