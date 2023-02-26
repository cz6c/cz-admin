<template>
  <div class="login">
    <div class="content-wrapper">
      <div class="title-wrapper">
        <h1 class="title">登录</h1>
        <p class="description">title</p>
      </div>
      <el-form ref="FormEle" :rules="rules" label-position="top" :model="loginForm" label-width="80px">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="loginForm.userName" tabindex="2" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <template #label>
            <span>密码</span>
          </template>
          <el-input v-model="loginForm.password" tabindex="3" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            ref="code"
            v-model="loginForm.code"
            tabindex="4"
            placeholder="验证码"
            name="code"
            type="text"
            autocomplete="on"
            @keyup.enter.native="handleLogin(formRef)"
          />
          <el-image
            :key="codeKey"
            :src="`${baseURL}/adminapi/code?uuid=${codeKey}`"
            class="code-view"
            @click.native="flushCode"
          >
            <div slot="error" class="el-image__error">点击刷新</div>
          </el-image>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login-btn" :loading="loading" tabindex="5" @click="handleLogin(formRef)"
        >登 录</el-button
      >
      <el-alert
        v-if="isLoginTimeOut"
        title="由于登录时间超时，您已被注销登录！"
        type="warning"
        show-icon
        :closable="false"
        class="login-timeout"
      >
      </el-alert>
    </div>
    <div class="version-tips">版权信息 | cz6</div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from "vue";
import { authStore } from "@/store/auth";
import { useRoute, useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
const formRef = ref<FormInstance>();
const route = useRoute();
const router = useRouter();

let redirect = ref("");
watch(
  () => route,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
    const query = route.query;
    if (query.redirect) {
      redirect.value = String(query.redirect);
    }
  },
  { immediate: true },
);

const loginForm = reactive({
  code: "",
  password: "",
  userName: "",
});
const rules: FormRules = {
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
};
const auth = authStore();
const loading = ref(false);
const isLoginTimeOut = true;
/**
 * @description: 登录
 */
function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      try {
        loading.value = true;
        await auth.login(loginForm);
        router.push({
          path: redirect.value || "/",
        });
        loading.value = false;
      } catch (error) {
        flushCode();
        loading.value = false;
      }
    }
  });
}

const baseURL = import.meta.env.VITE_BASE_URL;
let codeKey = ref(+new Date());
/**
 * @description: 刷新验证码
 */
function flushCode() {
  codeKey.value = +new Date();
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
