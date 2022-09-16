import { HOME_PAGE, LOGIN_PAGE, NAVIGATE_TYPE_LIST, NOT_FOUND_PAGE } from '@/enums/routerEnum';
import { AUTH_PAGE, router } from '@/utils/router/index';
import { useAuthStore } from '@/state/modules/auth';
import { jumpLogin } from '@/utils/router/constant';
import { useRouterStore } from '@/state/modules/router';

/**
 * 忽略验证
 * @param path
 * @return boolean
 */
export function ignoreAuth(path: string): boolean {
  console.log('忽略验证', path);
  const _path = path.startsWith('/') ? path.slice(1) : path;
  const routerStore = useRouterStore();
  const routes = routerStore.getRoutes;
  if (!routes) return false;
  const route = routes.get(_path);
  return !!route?.meta?.ignoreAuth;
}

/**
 * 添加拦截器
 * 微信小程序端uni.switchTab拦截无效, 已在api中拦截
 * 微信小程序原生tabbar请使用onShow
 * 微信小程序端 <navigator>拦截无效,请使用api
 * @param routerName
 * @export void
 */
function addInterceptor(routerName: string) {
  uni.addInterceptor(routerName, {
    // 跳转前拦截
    invoke: (args) => {
      console.log(args, ignoreAuth(args.url));
      if (ignoreAuth(args.url)) return args;
      const authStore = useAuthStore();
      if (authStore.isLogin) return args;
      // jumpLogin(args.url);
      return false;
    },
    // 成功回调拦截
    success: (args) => {
      // console.log('回调', args);
      // const currentPages = getCurrentPages();
      // console.log('currentPages', currentPages);
      // const currentRoute = currentPages[currentPages.length - 1];
      // console.log('currentRoute', currentRoute);
    },
    // 失败回调拦截
    fail: (err: any) => {
      let reg: RegExp;
      /* #ifdef MP-WEIXIN */
      reg = /(.*)?(fail page ")(.*)(" is not found$)/;
      /* #endif */
      /* #ifndef MP-WEIXIN */
      reg = /(.*)?(fail page `)(.*)(` is not found$)/;
      /* #endif */
      if (reg.test(err.errMsg)) {
        const go = err.errMsg.replace(reg, '$3') || '';
        uni.navigateTo({
          url: `${NOT_FOUND_PAGE}?redirect=${HOME_PAGE}&go=${go}`,
        });
      }
      return false;
    },
    // 完成回调拦截
    complete: () => {},
  });
}

/**
 * 添加路由拦截器
 */
export function routerInterceptor() {
  NAVIGATE_TYPE_LIST.forEach((item) => {
    addInterceptor(item);
  });
}

/**
 * 移除路由拦截器
 */
export function routerRemoveInterceptor() {
  NAVIGATE_TYPE_LIST.forEach((item) => {
    uni.removeInterceptor(item);
  });
}
