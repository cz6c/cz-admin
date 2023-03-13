<template>
  <div class="tags-view">
    <el-scrollbar>
      <div class="multiple-tags">
        <div
          v-for="(tag, index) in multiTagsStore.getMultiTags"
          :key="index"
          :class="['tag', isActive(tag) ? 'active' : '']"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          <router-link :to="tag.fullPath || tag.path">
            <span>{{ tag.meta.title }}</span>
          </router-link>
          <el-icon v-show="!tag.meta?.affix" @click.prevent.stop="handleClose(1, tag)"><Close /></el-icon>
        </div>
      </div>
    </el-scrollbar>
    <!-- 右键菜单 -->
    <RightDropdown
      ref="rightDropdownRef"
      :visible="visible"
      :menuTop="menuTop"
      :menuLeft="menuLeft"
      :selectedTag="selectedTag"
    />
    <!-- 右侧功能 -->
    <div class="right-tool">
      <TagRedo />
      <FoldButton />
    </div>
  </div>
</template>
<script setup lang="ts" name="MultiplTags">
import { ref, watch, unref } from "vue";
import { useMultiTagsStore, MultiTagsItem } from "@/store/modules/multiTags";
import { useRoute } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { RouterEnum } from "@/router";
import { initAffixTags, useTagsDrag } from "./useMultipleTags";
import TagRedo from "./components/TagRedo.vue";
import FoldButton from "./components/FoldButton.vue";
import RightDropdown from "./components/RightDropdown.vue";

const route = useRoute();
const affixTextList = initAffixTags();
useTagsDrag(affixTextList);
const multiTagsStore = useMultiTagsStore();

const selectedTag = ref<MultiTagsItem>({});
const rightDropdownRef = ref();
const visible = ref<boolean>(false);
const menuTop = ref<number>(0);
const menuLeft = ref<number>(0);

function isActive(tag: MultiTagsItem) {
  return unref(route.fullPath) === tag.fullPath;
}

watch(
  () => route,
  value => {
    const { name } = unref(value);
    // 不需要新增的到标签页的情况在这里处理
    if (name === RouterEnum.REDIRECT_NAME || !value) {
      return;
    }
    const { path, fullPath, meta = {} } = value;
    // const { activeMenu, hideTag } = meta;
    // const isHide = !hideTag ? null : activeMenu;
    // if (isHide) {
    //   const findParentRoute = router.getRoutes().find(item => item.path === activeMenu);
    //   findParentRoute &&
    //     multiTagsStore.addTag({
    //       name: findParentRoute.name as string,
    //       path: findParentRoute.path,
    //       meta: findParentRoute.meta,
    //     });
    // } else {
    multiTagsStore.addTag({ name: name as string, path, meta, fullPath });
    // }
  },
  { immediate: true, deep: true },
);

/**
 * @description: 关闭标签页
 * @param {*} index
 * @param {*} tag
 */
function handleClose(index: number, tag: MultiTagsItem) {
  unref(rightDropdownRef).handleClickDrop(index, tag);
}

/**
 * @description: 打开右键菜单
 * @param {*} tag
 * @param {*} e
 */
function openMenu(tag: MultiTagsItem, e: MouseEvent) {
  // console.log(tag, e);
  menuLeft.value = e.clientX;
  menuTop.value = e.clientY;
  selectedTag.value = tag;
  visible.value = true;
}

/**
 * @description: 关闭右键菜单
 */
function closeMenu() {
  visible.value = false;
}

watch(
  () => visible.value,
  () => {
    useEventListener(document, "click", closeMenu);
  },
);
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
    .multiple-tags {
      padding: 5px;
      a {
        text-decoration: none;
        color: #616a88;
        padding: 0 8px;
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
          .el-icon {
            color: #409eff;
          }
        }
        .el-icon {
          position: absolute;
          top: 50%;
          transform: translate(-60%, -50%);
          font-size: 10px;
          color: #616a88;
          cursor: pointer;

          &:hover {
            border-radius: 50%;
            color: #fff;
            background: #b4bccc;
            font-size: 12px;
          }
        }
      }
    }
  }
  .right-tool {
    span {
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
}
</style>
