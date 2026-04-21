<!--
 * @Author: xiashan
 * @Date: 2025-11-24 11:24:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-21 11:26:25
 * @Description: 
-->
<template>
  <div class="no-content" :class="classKls">
    <img class="no-content__img" :src="useIcon('doc')" />
    <el-text type="primary">{{ props.text || $t("noResult") }}</el-text>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    border?: boolean;
    text?: string;
    size?: "small" | "medium" | "large";
  }>(),
  {
    border: true,
    text: "",
    size: "medium",
  },
);

const classKls = computed(() => [
  props.border ? "is-border" : "",
  props.size ? `is-${props.size}` : "",
]);
</script>

<style lang="scss" scoped>
.no-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;

  &__img {
    width: 48px;
    height: 56px;
  }

  &.is-border {
    margin-top: 18px;
  }

  &.is-small {
    .no-content__img {
      width: 32px;
      height: 38px;
    }
  }
}
</style>
