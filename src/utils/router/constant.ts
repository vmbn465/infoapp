import { router } from '@/utils/router/index';
import { LOGIN_PAGE } from '@/enums/routerEnum';

/**
 * 跳转登录
 * @param path
 */
export function jumpLogin(path: string) {
  const _path = path.startsWith('/') ? path : `/${path}`;
  const pathQuery = encodeURIComponent(_path);
  router.push(`${LOGIN_PAGE}?redirect=${pathQuery}`);
}
