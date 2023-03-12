<template>
  <div class="tags-view">
    <el-scrollbar>
      <div class="multiple-tags">
        <div
          v-for="(tag, index) in multiTagsStore.getMultiTags"
          :key="index"
          :class="['tag', $route.path === tag.path ? 'active' : '']"
          @contextmenu.prevent="openMenu(tag, $event)"
          @mouseenter.prevent="activeIndex = index"
          @mouseleave.prevent="activeIndex = -1"
        >
          <router-link :to="tag.path">
            <span>{{ tag.meta.title }}</span>
          </router-link>
          <el-icon v-show="index === activeIndex && index !== 0" @click.prevent.stop="handleClose(1, tag)"
            ><Close
          /></el-icon>
        </div>
      </div>
    </el-scrollbar>
    <!-- 右键菜单 -->
    <RightDropdown
      ref="rightDropdownRef"
      :visible="visible"
      :menuStyle="getContextMenuStyle"
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
import { ref, computed, watch, CSSProperties, unref } from "vue";
import { useMultiTagsStore, MultiTagsItem } from "@/store/modules/multiTags";
import { useRoute, useRouter } from "vue-router";
import { useEventListener } from "@vueuse/core";
import { RouterEnum } from "@/router";
import { initAffixTags, useTagsDrag } from "./useMultipleTags";
import TagRedo from "./components/TagRedo.vue";
import FoldButton from "./components/FoldButton.vue";
import RightDropdown from "./components/RightDropdown.vue";

const route = useRoute();
const router = useRouter();
const affixTextList = initAffixTags();
useTagsDrag(affixTextList);
const multiTagsStore = useMultiTagsStore();

const activeIndex = ref<number>(-1);
const selectedTag = ref<MultiTagsItem>();
const rightDropdownRef = ref();
const visible = ref<boolean>(false);
const menuTop = ref<number>(0);
const menuLeft = ref<number>(0);
const getContextMenuStyle = computed((): CSSProperties => {
  return { left: menuLeft.value + "px", top: menuTop.value + "px" };
});

watch(
  () => route,
  value => {
    console.log(value);
    const name = value.name as string;
    // 不需要新增的到标签页的情况在这里处理
    if (name === RouterEnum.REDIRECT_NAME || !value) {
      return;
    }
    const { path, meta = {} } = value;
    const { activeMenu, hideTag } = meta;
    const isHide = !hideTag ? null : activeMenu;
    // const p = isHide || fullPath || path;
    // if (activeKeyRef.value !== p) {
    //   activeKeyRef.value = p as string;
    // }
    if (isHide) {
      const findParentRoute = router.getRoutes().find(item => item.path === activeMenu);
      findParentRoute &&
        multiTagsStore.addView({
          name: findParentRoute.name as string,
          path: findParentRoute.path,
          meta: findParentRoute.meta,
        });
    } else {
      multiTagsStore.addView({ name, path, meta });
    }
  },
  { immediate: true, deep: true },
);

function handleClose(index: number, tag: MultiTagsItem) {
  unref(rightDropdownRef).handleClickDrop(index, tag);
}

/**
 * @description: 打开右键菜单
 * @param {*} tag
 * @param {*} e
 */
function openMenu(tag: MultiTagsItem, e: MouseEvent) {
  console.log(tag, e);
  // if (tag.name === "LoginLog") {
  //   // 右键菜单为首页
  //   tagMenu[0].disabled = false;
  //   tagMenu[1].disabled = true;
  //   tagMenu[2].disabled = !(multiTags.value.length > 1);
  //   tagMenu[3].disabled = true;
  // } else {
  //   // 右键菜单不匹配当前路由，禁用刷新
  //   tagMenu[0].disabled = route.path !== tag.path && route.name !== tag.name;
  //   tagMenu[1].disabled = !(multiTags.value.length > 1);
  //   tagMenu[2].disabled = !(multiTags.value.length > 2);
  //   tagMenu[3].disabled = !(multiTags.value.length > 1);
  // }
  menuLeft.value = e.clientX;
  menuTop.value = e.clientY;
  visible.value = true;
  selectedTag.value = tag;
}

/**
 * @description: 关闭右键菜单
 * @return {*}
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
