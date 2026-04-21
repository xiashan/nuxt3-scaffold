<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-14 10:11:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:37:40
 * @FilePath: /nuxt3-scaffold/template/layouts/default.vue
 * @Description: 
-->
<template>
  <el-container class="layout-container" direction="vertical">
    <layout-header></layout-header>
    <el-main>
      <slot></slot>
    </el-main>
    <layout-footer></layout-footer>
  </el-container>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
}
</style>
