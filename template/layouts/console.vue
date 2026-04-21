<!--
 * @Author: xiashan
 * @Date: 2025-04-28 16:43:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:39:27
 * @Description: 
-->
<template>
  <el-container class="layout-container" direction="vertical">
    <layout-header></layout-header>
    <el-container>
      <layout-console-aside></layout-console-aside>
      <slot></slot>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;
  background-color: var(--el-bg-color-page);

  .el-container {
    overflow: hidden;

    :deep(.el-main) {
      padding: 0;
    }
  }
}
</style>
