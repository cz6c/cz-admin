<template>
  <div class="auth-redirect"></div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const redirect: any = route.query.redirect;
console.log("AuthRedirect", redirect);
router.push(redirect);
</script>
