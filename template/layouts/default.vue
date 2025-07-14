<!--
 * @Author: lishaonan lishaonan@noxgroup.com
 * @Date: 2025-03-31 11:26:57
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-14 15:45:15
 * @FilePath: /ai-robot/layouts/landing.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by NoxGroup, All Rights Reserved. 
-->
<template>
  <slot></slot>
</template>

<script lang="ts" setup>
const route = useRoute();
const page = ref("");

watch(
  () => route,
  (to) => {
    page.value = to.path.split("/").pop() || "";
  },
  { immediate: true, deep: true },
);
</script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
}

:deep(> .el-main) {
  display: flex;
  justify-content: center;
  padding: 0;

  .page-container {
    width: 100%;
    max-width: 1440px;
    overflow-x: hidden;
    background-image: none !important;
  }
}

:deep(.layout-landing) {
  .full-screen {
    flex: auto !important;
    height: calc(100vh - 266px);
  }

  .page-content {
    padding-bottom: 0 !important;
  }
}
</style>
