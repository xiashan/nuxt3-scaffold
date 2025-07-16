<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-14 15:40:30
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-16 20:03:45
 * @FilePath: /nuxt3-scaffold/template/pages/index.vue
 * @Description: 
-->
<template>
  <div class="page-container">
    <h1>{{ $t("helloIam", ["xiashan"]) }}</h1>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.page-container {
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
}
</style>
