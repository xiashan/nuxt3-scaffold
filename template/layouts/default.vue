<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-14 10:11:11
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:05:14
 * @FilePath: /nuxt3-scaffold/template/layouts/default.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container" direction="vertical">
    <common-header></common-header>
    <el-main>
      <slot></slot>
    </el-main>
    <common-footer></common-footer>
  </el-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
}
</style>
