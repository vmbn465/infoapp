import { defineStore } from "pinia";
import { getCache, setCache } from "@/utils/cache";

interface UserState {
  id?: string | number;
  openId?: string;
  nickName?: string;
  headImgUrl?: string;
}

export const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    id: undefined,
    openId: undefined,
    nickName: undefined,
    headImgUrl: undefined
  }),
  getters: {
    getNickName: (state) => state.nickName,
    getHeadImgUrl: (state) => state.headImgUrl,
    getOpenId: (state) => state.openId
  },
  actions: {
    init(){
      this.openId=getCache("USER_OPEN_ID") || undefined
      this.nickName=getCache("USER_NICK_NAME") || undefined
      this.headImgUrl=getCache("USER_HEAD_IMG_URL") || undefined
    },
    setNickName(nickName) {
      setCache('USER_NICK_NAME', nickName);
      this.nickName = nickName;
    },
    setHeadImgUrl(headImgUrl) {
      setCache("USER_HEAD_IMG_URL", headImgUrl);
      this.headImgUrl = headImgUrl;
    },
    setOpenId(openId) {
      setCache("USER_OPEN_ID", openId);
      this.openId = openId;
    }
  }
});
