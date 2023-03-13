import { defineStore } from "pinia";
import store from "@/store";

interface layoutStore {
  showSidebar: boolean;
  showNavbar: boolean;
  isCollapse: boolean;
}

export const layoutStore = defineStore("layout", {
  state: (): layoutStore => ({
    // 显示 Sidebar
    showSidebar: true,
    // 显示 Navbar
    showNavbar: true,
    // Sidebar 折叠
    isCollapse: false,
  }),
  getters: {
    getShowSidebar(): boolean {
      return this.showSidebar;
    },
    getShowNavbar(): boolean {
      return this.showNavbar;
    },
    getIsCollapse(): boolean {
      return this.isCollapse;
    },
  },
  actions: {
    setShowSidebar(flag: boolean) {
      this.showSidebar = flag;
    },
    setShowNavbar(flag: boolean) {
      this.showNavbar = flag;
    },
    setIsCollapse(flag: boolean) {
      this.isCollapse = flag;
    },
  },
});

export function useLayoutStore() {
  return layoutStore(store);
}
