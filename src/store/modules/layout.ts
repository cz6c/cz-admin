import { defineStore } from "pinia";
import store from "@/store";

interface layoutStore {
  showSidebar: boolean;
  showNavbar: boolean;
}

export const layoutStore = defineStore("layout", {
  state: (): layoutStore => ({ showSidebar: true, showNavbar: true }),
  getters: {
    getShowSidebar(): boolean {
      return this.showSidebar;
    },
    getShowNavbar(): boolean {
      return this.showNavbar;
    },
  },
  actions: {
    setShowSidebar(flag: boolean) {
      this.showSidebar = flag;
    },
    setShowNavbar(flag: boolean) {
      this.showNavbar = flag;
    },
  },
});

export function useLayoutStore() {
  return layoutStore(store);
}
