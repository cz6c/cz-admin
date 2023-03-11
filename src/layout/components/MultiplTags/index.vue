<template>
  <div class="tags-view">
    <el-scrollbar>
      <div class="tags">
        <div
          v-for="tag in multiTags"
          :key="tag.path"
          :class="['tag', $route.path === tag.path ? 'active' : '']"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          <router-link :to="tag.path">
            <span>{{ tag.meta.title }}</span>
          </router-link>
          <el-icon v-if="tag.name !== 'LoginLog'" @click.prevent.stop="onClickDrop(1, tag)"><Close /></el-icon>
        </div>
      </div>
    </el-scrollbar>
    <!-- 右键菜单按钮 -->
    <transition name="el-zoom-in-top">
      <ul v-show="visible" :key="Math.random()" :style="getContextMenuStyle" class="contextmenu">
        <div v-for="(item, index) in tagMenu" :key="index" style="display: flex; align-items: center">
          <li v-if="item.show" @click="onClickDrop(index, selectedTag)">
            <el-icon><ArrowDown /></el-icon>
            {{ item.text }}
          </li>
        </div>
      </ul>
    </transition>
    <!-- 右侧功能按钮 -->
    <div class="right-tool">
      <span class="tool" @click="onFresh">
        <el-icon><RefreshRight /></el-icon>
      </span>
    </div>
  </div>
</template>
<script setup lang="ts" name="MultiplTags">
import { ref, computed, unref, reactive, watch, CSSProperties } from "vue";
import { useMultiTagsStore } from "@/store/modules/multiTags";
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from "vue-router";
import { cloneDeep } from "lodash-es";

const route = useRoute();
const router = useRouter();

const multiTags = computed(() => {
  return useMultiTagsStore().multiTags;
});
const tagMenu = reactive<Array<any>>([
  {
    icon: "RefreshRight",
    text: "刷新",
    disabled: false,
  },
  {
    icon: "Close",
    text: "关闭",
    disabled: !(multiTags.value.length > 1),
  },
  {
    icon: "CloseOtherTags",
    text: "关闭其他",
    disabled: !(multiTags.value.length > 2),
  },
  {
    icon: "CloseAllTags",
    text: "关闭全部",
    disabled: !(multiTags.value.length > 1),
  },
]);

const visible = ref<boolean>(false);
const menuTop = ref<number>();
const menuLeft = ref<number>();
const selectedTag = ref<RouteLocationNormalizedLoaded>();
const getContextMenuStyle = computed((): CSSProperties => {
  return { left: menuLeft.value + "px", top: menuTop.value + "px" };
});

watch(
  () => route,
  value => {
    useMultiTagsStore().addView(cloneDeep(value));
  },
  { immediate: true, deep: true },
);

/**
 * @description: 刷新路由
 */
function onFresh() {
  const { fullPath, query } = unref(route);
  router.replace({
    path: "/redirect" + fullPath,
    query: query,
  });
}
/**
 * @description: 打开右侧菜单
 * @param {*} tag
 * @param {*} e
 */
function openMenu(tag: RouteLocationNormalizedLoaded, e: MouseEvent) {
  if (tag.name === "LoginLog") {
    // 右键菜单为首页
    tagMenu[0].disabled = false;
    tagMenu[1].disabled = true;
    tagMenu[2].disabled = !(multiTags.value.length > 1);
    tagMenu[3].disabled = true;
  } else {
    // 右键菜单不匹配当前路由，禁用刷新
    tagMenu[0].disabled = route.path !== tag.path && route.name !== tag.name;
    tagMenu[1].disabled = !(multiTags.value.length > 1);
    tagMenu[2].disabled = !(multiTags.value.length > 2);
    tagMenu[3].disabled = !(multiTags.value.length > 1);
  }
  menuTop.value = e.clientX;
  menuLeft.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
}
/**
 * @description: 右键菜单点击
 * @param {*} index
 * @param {*} view
 */
async function onClickDrop(index: number, view: RouteLocationNormalizedLoaded | undefined) {
  // 当前路由信息
  switch (index) {
    case 0:
      // 刷新路由
      onFresh();
      break;
    case 1:
      // 关闭任意一个标签页
      await useMultiTagsStore().deleteTag("now", view);
      if (route.path === view?.path) {
        toLastView();
      }
      break;
    case 2:
      // 关闭其他标签页
      useMultiTagsStore().deleteTag("other", view);
      break;
    case 3:
      // 关闭全部标签页
      useMultiTagsStore().deleteTag("all");
      router.push("/");
      break;
  }
}
function toLastView() {
  const latestView = multiTags.value.slice(-1)[0];
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch(err => {
      console.warn(err);
    });
  } else {
    router.push("/").catch(err => {
      console.warn(err);
    });
  }
}
</script>
<style lang="scss" scoped>
.tags-view {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  color: #616a88;
  background: #fff;
  position: relative;
  box-shadow: 0 0 1px #888;

  :deep(.el-scrollbar) {
    flex: 1;
    .tags {
      padding: 5px;
      a {
        text-decoration: none;
        color: #616a88;
        padding: 0 6px;
      }
      .tag {
        position: relative;
        display: inline-block;
        padding: 0 6px;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 0 1px #888;
        height: 28px;
        line-height: 28px;
        margin-right: 6px;
        cursor: pointer;
        &.active {
          color: #409eff;
          a {
            color: #409eff;
          }
        }
        span {
          margin-right: 6px;
        }
        .el-icon {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: 10px;
          color: #616a88;
          cursor: pointer;

          &:hover {
            border-radius: 50%;
            color: #fff;
            background: #b4bccc;
            font-size: 13px;
          }
        }
      }
    }
  }
  .right-tool {
    .tool {
      display: inline-block;
      width: 38px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
      border-left: 1px solid #d9d9d9;
      box-sizing: border-box;
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 6666;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 400;
    color: #616a88;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

    li {
      margin: 0;
      padding: 4px 16px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
