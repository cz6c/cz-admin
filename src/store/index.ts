import { defineStore } from "pinia";

interface userInfo {
  userName: string;
  id: number;
}

const getUserInfo = () => {
  return new Promise<userInfo>((resolve, reject) => {
    setTimeout(() => {
      const data = {
        userName: "cz6",
        id: 6,
      };
      resolve(data);
    }, 2000);
  });
};

export const authStore = defineStore("auth", {
  state: () => ({ userName: "", id: 0 }),
  getters: {
    newName(state) {
      return `${state.userName}--newName--`;
    },
  },
  actions: {
    async getUserInfo() {
      const data = await getUserInfo();
      this.$patch(data)
    },
  },
});
