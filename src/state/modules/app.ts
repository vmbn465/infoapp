import { defineStore } from 'pinia';
import { Pages } from '@/types/pages';
import { pagesMap } from '@/utils/router/pages';

interface AppStore {
  pages: Map<string, Pages> | undefined;
  currentPage: Pages | undefined;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppStore => ({
    pages: undefined,
    currentPage: undefined,
  }),
  getters: {
    getPages(state) {
      return state.pages;
    },
    getCurrentPage(state) {
      return state.currentPage;
    },
  },
  actions: {
    initialize() {
      this.setPages();
    },
    setPages() {
      this.pages = pagesMap;
    },
    setCurrentPage(path: string) {
      this.currentPage = this.pages?.get(path);
    },
  },
});
