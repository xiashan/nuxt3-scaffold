<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-04-29 18:52:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:31:05
 * @FilePath: /frontend/components/user/UserAvatar.vue
 * @Description: 
-->
<template>
  <ElAvatar
    v-if="user?.avatar"
    :size="size"
    class="avatar"
    :src="user.avatar"
  />
  <img
    v-else
    :width="size"
    :height="size"
    class="avatar"
    :src="ImgMap.defaultAvatar"
  />
</template>

<script lang="ts" setup>
import { ImgMap } from "@/constants/mapping";

const { size = 40 } = defineProps<{
  size?: number;
}>();
const { user } = useUserSession();
</script>

<style lang="scss" scoped></style>
