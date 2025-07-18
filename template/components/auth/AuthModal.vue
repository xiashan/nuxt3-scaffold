<template>
  <ClientOnly>
    <ElDialog
      v-model="authStore.isAuthModalShow"
      append-to-body
      :show-close="false"
      class="auth-modal"
      modal-class="auth-modal-overlay"
      width="672"
      align-center
    >
      <div class="modal-header">
        <img style="height: 32px" src="~/assets/images/google_logo.svg" />
        <ElIcon
          class="close-icon"
          :size="16"
          @click="authStore.isAuthModalShow = false"
        >
          <ElIconCloseBold></ElIconCloseBold>
        </ElIcon>
      </div>
      <div>
        <ElButton
          class="gp-login-button"
          :disabled="!isReady"
          @click="() => login()"
        >
          <img
            style="margin-right: 8px; vertical-align: top"
            height="20"
            src="~/assets/images/google.png"
            alt="google"
          />
          {{ $t("SignInWithGoogle") }}
        </ElButton>
        <div class="tip">
          <i18n-t keypath="signUpTip">
            <el-link href="/terms" target="_blank" type="primary">
              服务条款
            </el-link>
            <el-link href="/en/privacy-policy" target="_blank" type="primary">
              隐私协议
            </el-link>
          </i18n-t>
        </div>
      </div>
    </ElDialog>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useTokenClient } from "vue3-google-signin";
import type {
  AuthCodeFlowSuccessResponse,
  AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
const authStore = useAuthStore();
const { t } = useI18n();
const { trackEvent } = useTrack();

const onLoginSuccess = async (res: SignInUserInfo) => {
  if (!res) ElMessage.error(t("unknownError"));
  const eventName = res.flag === 0 ? "register" : "login";
  trackEvent(
    eventName,
    {
      user_id: res.userId,
      register_time: res.createTime,
      last_login: res.extraVo?.lastLoginTime,
      login_days: res.extraVo?.loginDays,
    },
    {
      delay: false,
    },
  );
  location.reload();
};
const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  $api<ResponseData<SignInUserInfo>>("/api/auth/googleSignIn", {
    method: "POST",
    body: {
      code: `accessToken.${response.access_token}`,
    },
  }).then((res) => {
    onLoginSuccess(res.data);
  });
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});
</script>

<style lang="scss">
.auth-modal-overlay {
  background-color: rgb(0 0 0 / 20%);
}

@media (width<=520px) {
  .auth-modal {
    height: 100%;
  }
}

.auth-modal {
  padding: 40px 56px 24px;
  border-radius: 16px;

  .close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    color: var(--text-color-secondary);
    cursor: pointer;
  }

  .el-dialog__header {
    padding: 0;
  }

  .modal-header {
    display: flex;
    gap: 0 8px;
    align-items: center;
    justify-content: center;
  }

  .tip {
    padding-top: 16px;
    font-size: 16px;
    color: var(--el-text-color-primary);
    text-align: center;

    .el-link {
      font-size: 16px;
      vertical-align: baseline;
    }
  }

  .gp-login-button {
    gap: 8px;
    width: 100%;
    height: 56px;
    margin: 76px 0 80px;
    font-size: var(--font-size-medium);
    color: var(--text-color-primary);
    cursor: pointer;
    background-color: #fff;
    border: 2px solid var(--color-primary);
    border-radius: 8px;
  }
}
</style>
