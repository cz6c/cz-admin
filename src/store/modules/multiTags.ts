import { defineStore } from "pinia";
import store from "@/store";
import type { RouteLocationNormalizedLoaded, RouteRecordName } from "vue-router";

export interface TagsViewState {
  multiTags: RouteLocationNormalizedLoaded[];
  cachedViews: RouteRecordName[];
}

export const multiTagsStore = defineStore("multiTags", {
  state: (): TagsViewState => ({
    // 标签页
    multiTags: [],
    // 缓存页
    cachedViews: [],
  }),
  getters: {
    getCaches(): RouteRecordName[] {
      return this.cachedViews;
    },
  },
  actions: {
    addTag(view: RouteLocationNormalizedLoaded) {
      // 如果存在就retuen
      if (this.multiTags.some(v => v.path === view.path)) return;
      // 如果title为空拒绝添加空信息到标签页
      if ((view.meta.title as string).length === 0) return;
      this.multiTags.push(view);
    },
    addCache(view: RouteLocationNormalizedLoaded) {
      if (!view.name) return;
      if (this.cachedViews.includes(view.name)) return;
      if (view.meta && !view.meta.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    addView(view: RouteLocationNormalizedLoaded) {
      this.addTag(view);
      this.addCache(view);
    },
    deleteTag(type: "now" | "other" | "all", view?: RouteLocationNormalizedLoaded) {
      switch (type) {
        case "now":
          const index = this.multiTags.findIndex(x => x.path === view?.path);
          index > -1 && this.multiTags.splice(index, 1);
          if (!view?.name) return;
          const i = this.cachedViews.indexOf(view?.name);
          i > -1 && this.cachedViews.splice(i, 1);
          break;
        case "other":
          const oindex = this.multiTags.findIndex(x => x.path === view?.path);
          if (oindex === -1) return;
          this.multiTags = this.multiTags.filter(x => x.path === view?.path);
          // this.multiTags.splice(0, oindex);
          // this.multiTags.splice(oindex + 1, this.multiTags.length - 1);
          if (!view?.name) return;
          this.cachedViews = this.cachedViews.filter(x => x === view?.name);
          break;
        case "all":
          this.multiTags = [];
          this.cachedViews = [];
          break;
      }
    },
  },
});

export function useMultiTagsStore() {
  return multiTagsStore(store);
}
