import { defineStore } from 'pinia';
import { Pages } from '@/types/pages';
import { pagesMap } from '@/utils/router/pages';

interface routeStore {
  routes: Map<string, Pages> | undefined;
  currentRouter: Pages | undefined;
}

export const useRouterStore = defineStore({
  id: 'routerStore',
  state: (): routeStore => ({
    routes: undefined,
    currentRouter: undefined,
  }),
  getters: {
    getRoutes(state) {
      return state.routes;
    },
    getCurrentRoute(state) {
      return state.currentRouter;
    },
  },
  actions: {
    initialize() {
      this.setRoutes();
    },
    setRoutes() {
      this.routes = pagesMap;
    },
    setCurrentRoute(path: string) {
      this.currentRouter = this.routes?.get(path) || undefined;
    },
  },
});
