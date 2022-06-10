import { defineStore } from 'pinia';
import { getCache, setCache } from '@/utils/catch';
import { TOKEN_KEY } from '@/enums/cacheEnum';

interface UserState {
  token?: string;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: undefined,
  }),
  getters: {
    getToken: (state) => state.token || getCache<string>(TOKEN_KEY),
  },
  actions: {
    setToken(token: string) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },
  },
});
