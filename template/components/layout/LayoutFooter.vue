<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-16 17:19:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-03-23 17:06:36
 * @FilePath: /nuxt3-scaffold/template/components/layout/LayoutFooter.vue
 * @Description: 
-->
<template>
  <el-footer class="common-footer">
    <div class="common-footer__content">
      <span class="common-footer__text"
        >© 2026 Kflx AI. All rights reserved.</span
      >
      <a class="common-footer__text" href="/privacy" target="_blank">
        {{ $t("privacy") }}
      </a>
    </div>
  </el-footer>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.common-footer {
  height: 60px;
  padding: 0;
  border-top: 1px solid var(--el-border-color);
}

.common-footer__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 37px;
  color: var(--el-text-color-primary);

  @include font-base;

  a {
    color: var(--el-text-color-primary) !important;
    text-decoration: none;

    &:hover {
      color: var(--el-color-primary) !important;
    }
  }
}
</style>
