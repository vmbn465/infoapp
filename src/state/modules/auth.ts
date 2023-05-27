import { defineStore } from "pinia";
import { getCache, removeCache, setCache } from "@/utils/cache";
import { TOKEN_KEY, USER_INFO_KEY } from "@/enums/cacheEnum";
import { logout } from "@/services/api/auth";

interface AuthState {
  token?: string;
  userInfo?: { nickName: string, headImgUrl: string, openId: string, id:string };
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    token: undefined,
    userInfo: undefined
  }),
  getters: {
    getToken: (state) => state.token,
    isLogin: (state): boolean => !!state.token,
    getAuthorization: (state) => {
      return state.token ? { authorization: `Bearer ${state.token}` } : {};
    },
    getNickName: (state) => state.userInfo?.nickName,
    getHeadImgUrl: (state) => state.userInfo?.headImgUrl,
    getOpenId: (state) => state.userInfo?.openId,
    getId: (state) => state.userInfo?.id
  },
  actions: {
    initToken() {
      this.token = getCache<string>(TOKEN_KEY) || undefined;
    },
    initUserInfo() {
      this.userInfo = getCache(USER_INFO_KEY) || undefined;
    },
    setToken(token: string | undefined) {
      setCache(TOKEN_KEY, token);
      this.token = token;
    },
    setUserInfo(user: any) {
      setCache(USER_INFO_KEY, user);
      this.userInfo = user;
    },
    /**
     * @description 登出
     */
    async loginOut(): Promise<any> {
      try {
        const res = await logout();
        removeCache(TOKEN_KEY);
        removeCache(USER_INFO_KEY);
        this.setToken(undefined);
        this.setUserInfo(undefined);
        return Promise.resolve(res);
      } catch (err: any) {
        return Promise.reject(err);
      }
    }
    /**
     * @description 刷新token
     */
    // async refreshToken(): Promise<LoginModel> {
    //     try {
    //         const { data } = await refreshToken();
    //         this.setToken(data.token);
    //         return Promise.resolve(data);
    //     } catch (err: any) {
    //         return Promise.reject(err);
    //     }
    // },
  }
});
