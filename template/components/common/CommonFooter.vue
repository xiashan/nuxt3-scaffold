<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-16 17:19:02
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 19:22:57
 * @FilePath: /nuxt3-scaffold/template/components/common/CommonFooter.vue
 * @Description: 
-->
<template>
  <el-footer>
    <div class="container">
      <div class="logo">
        <img src="~/assets/images/google_logo.svg" alt="logo" />
      </div>
      <el-divider />
      <div class="link-list">
        <span class="copy-right">© 2025</span>
        <NoLinkLocale href="/privacy-policy" target="_blank">
          {{ $t("privacy") }}
        </NoLinkLocale>
        <el-divider direction="vertical" />
        <NoLinkLocale href="/terms" target="_blank">
          {{ $t("terms") }}
        </NoLinkLocale>
      </div>
    </div>
  </el-footer>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.el-footer {
  height: fit-content;
  padding-top: 48px;
  padding-bottom: 48px;

  .container {
    position: relative;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }

  .logo {
    position: absolute;
    top: 24px;
    left: 0;

    img {
      width: 92px;
      height: 30px;
      margin-right: 6px;
      vertical-align: sub;
    }

    @media (width <= 1200px) {
      display: none;
    }
  }

  .link-list {
    margin: 24px 0 0;
    font-size: 12px;
    text-align: center;
    line-height: 30px;

    .copy-right {
      margin-right: 24px;
    }

    a {
      color: var(--text-color-primary);
    }
  }
}
</style>
