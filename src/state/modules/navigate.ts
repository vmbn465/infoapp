import { defineStore } from "pinia";

export const useNavigateStore = defineStore({
  id: "navigate",
  state: () => {
    return {
      reload: false
    };
  }
});