import { defineStore } from "pinia";
import store from "@/store";

export interface tagItem {
  path: string;
  title: string;
}

export const multiTagsStore = defineStore("multiTags", {
  state: (): { multiTags: tagItem[] } => ({
    // 存储标签页信息
    multiTags: [],
  }),
  getters: {
    getCaches(): string[] {
      return this.multiTags.map(tag => tag.path);
    },
  },
  actions: {
    addTag(value: tagItem) {
      // 如果title为空拒绝添加空信息到标签页
      if (value.title.length === 0) return;
      const tagPath = value.path;
      // 替换已存在路由标签
      const index = this.multiTags.findIndex(item => item?.path === tagPath);
      if (index !== -1) {
        this.multiTags.splice(index, 1, value);
      } else {
        this.multiTags.push(value);
      }
    },
    deleteTag(type: "now" | "other" | "all", value?: string) {
      switch (type) {
        case "now":
          if (!value) return;
          const index = this.multiTags.findIndex(x => x.path === value);
          if (index === -1) return;
          this.multiTags.splice(index, 1);
          break;
        case "other":
          if (!value) return;
          const oindex = this.multiTags.findIndex(x => x.path === value);
          if (oindex === -1) return;
          this.multiTags.splice(0, oindex);
          this.multiTags.splice(oindex + 1, this.multiTags.length - 1);
          break;
        case "all":
          this.multiTags = [];
          break;
      }
    },
  },
});

export function useMultiTagsStore() {
  return multiTagsStore(store);
}
