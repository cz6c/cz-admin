<template>
  <div class="login">
    <div class="content-wrapper">
      <div class="title-wrapper">
        <h1 class="title">登录</h1>
        <p class="description">{{ BASE_TITLE }}</p>
      </div>
      <el-form ref="formRef" :rules="rules" label-position="top" :model="loginForm" label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <span>密码</span>
          </template>
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login-btn" :loading="loading" @click="handleLogin(formRef)">登 录</el-button>
      <!-- <el-alert
        v-if="isLoginTimeOut"
        title="由于登录时间超时，您已被注销登录！"
        type="warning"
        show-icon
        :closable="false"
        class="login-timeout"
      >
      </el-alert> -->
    </div>
    <div class="version-tips">版权信息 | cz6</div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from "vue";
import { useAuthStore } from "@/store/modules/auth";
import { useRoute, useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { $message } from "@/utils/message";
import { BASE_TITLE } from "@/config";

const formRef = ref<FormInstance>();
const route = useRoute();
const router = useRouter();
const { login } = useAuthStore();
const loading = ref(false);
let redirect = ref("");
const loginForm = reactive({
  password: "123456",
  username: "admin",
});
const rules: FormRules = {
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
};

watch(
  () => route,
  (newValue) => {
    const query = newValue.query;
    if (query.redirect) {
      redirect.value = String(query.redirect);
    }
  },
  { immediate: true },
);
/**
 * @description: 登录
 */
function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      try {
        loading.value = true;
        await login(loginForm);
        router.push({
          path: redirect.value || "/",
        });
        loading.value = false;
      } catch (error: any) {
        $message.warning(error.message);
        loading.value = false;
      }
    }
  });
}
</script>

<style scoped lang="scss">
.login {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .content-wrapper {
    width: 418px;
    .title-wrapper {
      display: flex;
      align-items: baseline;
      .title {
        font-size: 32px;
        font-weight: bold;
        color: #333333;
      }
      .description {
        margin-left: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
      }
    }
    :deep(.el-form) {
      margin: 40px 0;
      margin-top: 10px;
      .el-form-item {
        position: relative;
        margin-bottom: 24px;
        .el-form-item__label {
          width: 56px;
          height: 32px;
          line-height: 32px !important;
          text-align: justify;
          vertical-align: top;
          color: #333333;
          padding-bottom: 8px;
          line-height: 1;
          &::after {
            display: inline-block;
            width: 100%;
            content: "";
            height: 0;
          }
          &::before {
            display: none;
          }
        }
        .el-input__inner {
          height: 40px;
          line-height: 40px;
        }
        .code-view {
          position: absolute;
          right: 1px;
          top: 1px;
          height: 38px;
          width: 120px;
          cursor: pointer;
          z-index: 2;
          border-radius: 4px;
          user-select: none;
        }
      }
    }
    :deep(.login-btn) {
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-bottom: 16px;
    }
    .login-timeout {
      margin-top: 20px;
    }
  }
  .version-tips {
    position: absolute;
    bottom: 8px;
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 18px;
  }
}
</style>
