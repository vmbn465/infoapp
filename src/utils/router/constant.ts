import { router } from '@/utils/router/index';
import { LOGIN_PAGE } from '@/enums/routerEnum';
import { useRouterStore } from '@/state/modules/router';

/**
 * 是否忽略验证
 * @param path
 * @return boolean
 */
export function isIgnoreAuth(path: string): boolean {
  let _path = path.split('?')[0];
  _path = _path.startsWith('/') ? _path.slice(1) : _path;
  const routerStore = useRouterStore();
  const routes = routerStore.getRoutes;
  if (!routes) return false;
  const route = routes.get(_path);
  return route === undefined ? true : !!route?.meta?.ignoreAuth;
}

/**
 * 跳转登录
 * @param path
 */
export function jumpLogin(path: string) {
  const _path = path.startsWith('/') ? path : `/${path}`;
  const pathQuery = encodeURIComponent(_path);
  router.push(`${LOGIN_PAGE}?redirect=${pathQuery}`);
}
