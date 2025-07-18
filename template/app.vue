<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-11 16:05:44
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 14:47:35
 * @FilePath: /nuxt3-scaffold/template/app.vue
 * @Description: 
-->
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
    <AuthModal></AuthModal>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  useTrack().initTrack();
});
</script>
