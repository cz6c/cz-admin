<template>
  <div ref="containerDom" class="tags-view">
    <el-scrollbar>
      <div class="tags">
        <div
          v-for="item in multiTags"
          :key="item.path"
          closable
          :class="['tag', route.path === item.path ? 'active' : '']"
          @click="tagOnClick(item)"
        >
          <span>{{ item.title }}</span>
          <el-icon @click.stop="onClickDrop(1, item.path)"><Close /></el-icon>
        </div>
      </div>
    </el-scrollbar>
    <!-- 右侧功能按钮 -->
    <div class="right-tool">
      <span class="tool" @click="onFresh">
        <el-icon><RefreshRight /></el-icon>
      </span>
      <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand" @visible-change="visibleChange">
        <span class="tool">
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(item, key) in tagsViews"
              :key="key"
              :command="{ key, item }"
              :divided="item.divided"
              :disabled="item.disabled"
            >
              <el-icon><ArrowDown /></el-icon>
              {{ item.text }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts" name="MultiplTags">
import { ref, computed, unref, reactive } from "vue";
import { useMultiTagsStore, tagItem } from "@/store/modules/multiTags";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
console.log(route);

const multiTags = computed(() => {
  return useMultiTagsStore().multiTags;
});
const tagsViews = reactive<Array<any>>([
  {
    icon: "RefreshRight",
    text: "刷新",
    divided: false,
    disabled: false,
  },
  {
    icon: "Close",
    text: "关闭",
    divided: false,
    disabled: !(multiTags.value.length > 1),
  },
  {
    icon: "CloseOtherTags",
    text: "关闭其他",
    divided: true,
    disabled: !(multiTags.value.length > 2),
  },
  {
    icon: "CloseAllTags",
    text: "关闭全部",
    divided: false,
    disabled: !(multiTags.value.length > 1),
  },
]);

const containerDom = ref();

/**
 * @description: 触发tags标签切换
 * @param {*} item
 */
function tagOnClick(item: tagItem) {
  router.push(item.path);
}

function visibleChange(value: boolean) {
  console.log(value);
}

function handleCommand(command: any) {
  const { key, item } = command;
  onClickDrop(key, item);
}

function onClickDrop(key: number, item: any) {
  if (item && item.disabled) return;
  // 当前路由信息
  switch (key) {
    case 0:
      // 刷新路由
      onFresh();
      break;
    case 1:
      // 关闭当前标签页
      useMultiTagsStore().deleteTag("now", item);
      break;
    case 2:
      // 关闭其他标签页
      useMultiTagsStore().deleteTag("other", item);
      break;
    case 3:
      // 关闭全部标签页
      useMultiTagsStore().deleteTag("all");
      router.push("/");
      break;
  }
}
/** 刷新路由 */
function onFresh() {
  const { fullPath, query } = unref(route);
  router.replace({
    path: "/redirect" + fullPath,
    query: query,
  });
}
</script>
<style lang="scss" scoped>
.tags-view {
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  :deep(.el-scrollbar) {
    flex: 1;
    .tags {
      display: flex;
      padding: 5px;
      .tag {
        flex-shrink: 0;
        padding: 0 6px;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 0 1px #888;
        cursor: pointer;
        height: 28px;
        line-height: 28px;
        margin-right: 6px;
        &.active {
          color: #409eff;
        }
        span {
          margin-right: 6px;
        }
        :deep(.el-icon) {
          flex: 0 0 20px;
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
}
</style>
