<!--
 * @Author: xiashan xiashan@noxgroup.com
 * @Date: 2025-06-17 13:51:02
 * @LastEditors: xiashan xiashan@noxgroup.com
 * @LastEditTime: 2025-07-18 14:46:08
 * @FilePath: /nuxt3-scaffold/template/components/common/CommonHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-header>
    <div class="container">
      <!--logo-->
      <NuxtLinkLocale class="logo" to="/">
        <img src="~/assets/images/google_logo.svg" alt="logo" />
      </NuxtLinkLocale>
      <!--language-->
      <div>
        <el-dropdown
          class="language-dropdown"
          placement="bottom-start"
          popper-class="language-popper"
          :teleported="false"
          trigger="click"
        >
          <el-button>
            {{ LanguageMap[locale] }}
            <el-icon class="el-icon--right"><ElIconArrowDown /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="item in locales" :key="item.code">
                <NuxtLink
                  @click="
                    reloadNuxtApp({
                      force: true,
                      path: switchLocalePath(item.code),
                    })
                  "
                >
                  {{ LanguageMap[item.code] }}
                </NuxtLink>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button
          style="margin-left: 16px"
          @click="authStore.isAuthModalShow = true"
        >
          登录
        </el-button>
      </div>
    </div>
  </el-header>
</template>
<script setup lang="ts">
import { LanguageMap } from "~/assets/scripts/constant/language";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const authStore = useAuthStore();
const { loggedIn, user, clear: logout } = useUserSession();

const onClickLogout = () => {
  logout().then(() => {
    window.location.reload();
  });
};
</script>
<style lang="scss" scoped>
.el-header {
  --el-header-height: 56px;

  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: hsl(0deg 0% 100% / 80%);
  background-size: auto;
  backdrop-filter: blur(6px);

  .container {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 100px;
  }

  .logo {
    display: inline-block;
    width: 92px;
    height: 30px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  @media (width <= 1440px) {
    .container {
      padding: 0;
    }
  }
}
</style>
