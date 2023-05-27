import { useAuthStore } from "@/state/modules/auth";
import { Router } from "uni-mini-router/lib/interfaces";
import { useNavigateStore } from "@/state/modules/navigate";

export function createRouterGuard(router: Router) {
  createBeforeEachGuard(router);
  createAfterEachGuard(router);
}

function createBeforeEachGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const navStore = useNavigateStore();
    const authStore = useAuthStore();
    console.log("我是Before");
    // @ts-ignore
    if (to.name === "Home" && authStore.isLogin) {
      navStore.reload = true;
      next({ name: "Home", query: { reload: true }, navType: "pushTab" });
    } else if (to && to?.meta?.ignoreAuth) {
      // 如果目标路由忽略验证直接跳转
      next();
    } else if (!authStore.isLogin && to && to.name !== "Login") {
      // 如果没有登录且目标路由不是登录页面则跳转到登录页面
      // 将目标路由和参数传入登录页面，登录成功后直接跳转到目标路由，优化体验
      console.log("createBeforeEachGuard拦截了");
      next({ name: "Login", params: { redirect: to.name!, tabBar: to?.meta?.tabBar, ...to.query }, navType: "push" });
    } else if (authStore.isLogin && to && to.name === "Login") {
      // 如果已经登录且目标页面是登录页面则跳转至首页
      next({ name: "Home", navType: "repl 	aceAll" });
    } else {
      next();
    }
  });
}

function createAfterEachGuard(router: Router) {
  router.afterEach((to) => {
    // @ts-ignore
    if (to && to?.meta?.ignoreAuth) return;
    const authStore = useAuthStore();
    if (!authStore.isLogin && to && to.name !== "Login") {
      console.log("After拦截了");
      // 如果没有登录且目标路由不是登录页面则跳转到登录页面
      router.push({ name: "Login", params: { tabBar: to?.meta?.tabBar, ...to.query } });
    } else if (authStore.isLogin && to && to.name === "Login") {
      // 如果已经登录且目标页面是登录页面则跳转至首页
      router.replaceAll({ name: "Home" });
    }
  });
}
