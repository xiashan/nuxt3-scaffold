<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-07-17 13:56:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2026-04-17 10:47:13
 * @FilePath: /ai-kairo/frontend/components/layout/LayoutHeader.vue
 * @Description: 
-->
<template>
  <el-header>
    <div class="container">
      <AiFlex simple :size="113" align="center">
        <!--logo-->
        <NuxtLinkLocale class="logo" @click="handleClickLogo">
          <img src="~/assets/images/logo.png" alt="logo" />
          <span style="opacity: 0">Kflx</span>
        </NuxtLinkLocale>
        <!--language-->
        <el-select
          :model-value="selectedLocale"
          @update:model-value="handleLocaleChange"
        >
          <el-option
            v-for="item in locales"
            :key="item.code"
            :label="LanguageMap[item.code]"
            :value="item.code"
          />
        </el-select>
      </AiFlex>
      <!--login-->
      <AiButton v-if="!loggedIn" type="primary" size="l" @click="handleStart">
        {{ $t("getStart") }}
      </AiButton>
      <AiButton
        v-else
        type="primary"
        plain
        class="point-btn"
        @click="visible = true"
      >
        <img
          :src="useIcon('star-primary')"
          width="12"
          height="12"
          style="margin-right: 4px"
        />
        {{ userStore.quotas?.total_points }}
      </AiButton>
    </div>
    <UserPointModal v-model="visible"></UserPointModal>
  </el-header>
</template>
<script setup lang="ts">
import { LanguageMap } from "~/assets/scripts/constant/language";

const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const userStore = useUserStore();
const showDialogFlag = useLocalStorage("k-showdialog", false);
const { loggedIn } = useUserSession();

const visible = ref(false);
const selectedLocale = ref(locale.value);

watch(locale, (value) => {
  selectedLocale.value = value;
});

const { afterLoginRedirect, clearAfterLoginRedirect } = useAfterLoginRedirect();

const handleStart = () => {
  ensureSignIn(async () => {
    if (afterLoginRedirect.value) {
      const redirect = afterLoginRedirect.value;
      clearAfterLoginRedirect();
      redirect();
    } else {
      window.location.reload();
    }
  });
};

const handleClickLogo = () => {
  if (!showDialogFlag.value && !userStore.quotas.has_paid) {
    userStore.newMemberModalShow = true;
    showDialogFlag.value = true;
  }
  window.open("/", "_self");
};

const handleLocaleChange = async (value: string) => {
  if (value === locale.value) return;
  await setLocale(value);
  await navigateTo(switchLocalePath(value));
};
</script>
<style lang="scss" scoped>
.el-header {
  --el-header-height: 72px;
  --el-header-padding: 0 40px 0 37px;

  z-index: 1000;
  width: 100%;
  background: var(--el-bg-color-page);
  background-size: auto;
  border-bottom: 1px solid var(--el-border-color);
  backdrop-filter: blur(6px);

  .container {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .logo {
    display: inline-block;
    width: 90px;
    height: 43px;
    cursor: pointer;

    img {
      width: 100%;
      height: auto;
    }
  }

  .el-select {
    width: 122px;

    :deep(.el-select__wrapper) {
      font-size: 14px !important;
    }
  }

  .point-btn {
    > span {
      display: inline-flex;
      align-items: center;
    }
  }
}
</style>
