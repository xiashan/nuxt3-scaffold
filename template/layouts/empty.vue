<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-14 10:11:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-12-01 10:57:09
 * @FilePath: /nuxt3-scaffold/template/layouts/default.vue
 * @Description: 
-->
<template>
  <AiFlex :simple="true" :block="true" class="page" :size="0">
    <el-container class="layout-container" direction="vertical">
      <slot></slot>
    </el-container>
  </AiFlex>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  background-color: var(--el-bg-color-page);
}

.layout-container {
  position: relative;
  flex: 1;
  height: 100%;

  > .el-main {
    --el-main-padding: 0;
  }
}
</style>
