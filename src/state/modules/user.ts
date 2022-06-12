import { defineStore } from 'pinia';
import { getCache, setCache } from '@/utils/catch';
import { TOKEN_KEY } from '@/enums/cacheEnum';
import { login } from '@/services/api/user';

interface UserState {}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({}),
  getters: {},
  actions: {},
});
