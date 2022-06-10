import { defineStore } from 'pinia';
import { getCache, setCache } from '@/utils/catch';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { login } from '@/services/api/user';

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
    /**
     * @description 登录
     */
    async login(params: LoginParams): Promise<LoginModel> {
      try {
        const { data } = await login(params);
        this.setToken(data.token);
        return Promise.resolve(data);
      } catch (err: any) {
        return Promise.reject(err);
      }
    },
  },
});
