<template>
  <transition name="el-zoom-in-top">
    <ul v-show="visible" :key="Math.random()" :style="menuStyle" class="contextmenu">
      <li
        v-for="(item, index) in tagMenu"
        :key="index"
        :class="`${item.disabled ? 'disabled' : ''}`"
        @click="!item.disabled && handleClickDrop(index, props.selectedTag)"
      >
        <SvgIcon :name="item.icon" />
        <span> {{ item.text }}</span>
      </li>
    </ul>
  </transition>
</template>

<script setup lang="ts" name="RightDropdown">
import { unref, reactive, CSSProperties } from "vue";
import { useMultiTagsStore, MultiTagsItem } from "@/store/modules/multiTags";
import { useRouter } from "vue-router";

interface Props {
  visible: boolean;
  menuStyle: CSSProperties;
  selectedTag: MultiTagsItem | undefined;
}

interface TagMenuItem {
  icon: string;
  text: string;
  disabled: boolean;
}

const props = defineProps<Props>();

const multiTagsStore = useMultiTagsStore();
const router = useRouter();

const tagMenu = reactive<Array<TagMenuItem>>([
  {
    icon: "back_top",
    text: "重新加载",
    disabled: false,
  },
  {
    icon: "back_top",
    text: "关闭标签页",
    disabled: false,
  },
  {
    icon: "back_top",
    text: "关闭其他标签页",
    disabled: false,
  },
  {
    icon: "back_top",
    text: "关闭全部标签页",
    disabled: false,
  },
]);

function getCurrentTag() {
  const { currentRoute } = router;
  const route = unref(currentRoute);
  return multiTagsStore.getMultiTags.find(item => item.path === route.path)!;
}

/**
 * @description: 右键菜单点击
 * @param {*} index
 * @param {*} tag
 */
async function handleClickDrop(index: number, tag?: MultiTagsItem) {
  const currentTag = getCurrentTag();
  switch (index) {
    case 0:
      await multiTagsStore.refreshPage(router);
      break;

    case 1:
      await multiTagsStore.closeTag(tag || currentTag, router);
      break;

    case 2:
      await multiTagsStore.closeOtherTags(currentTag);
      break;

    case 3:
      await multiTagsStore.closeAllTags(router);
      break;
  }
}

defineExpose({
  handleClickDrop,
});
</script>

<style scoped lang="scss">
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 6666;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 2px;
  font-size: 12px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);

  li {
    margin: 0;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
    &.disabled {
      cursor: no-drop;
      opacity: 0.6;
      &:hover {
        background: none;
      }
    }
    span {
      padding-left: 4px;
    }
  }
}
</style>
